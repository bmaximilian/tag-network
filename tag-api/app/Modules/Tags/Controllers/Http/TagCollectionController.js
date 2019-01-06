
const { uniq } = require('lodash');

const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');
const TagCollection = use('App/Modules/Tags/Models/TagCollection');
const Tag = use('App/Modules/Tags/Models/Tag');
const TagCollectionTransformer = use('App/Modules/Tags/Transformers/TagCollectionTransformer');

/**
 * @class TagCollectionController
 */
class TagCollectionController {
    /**
     * Show a list of all tag collections.
     * GET collections
     *
     * @return {object} : All collections
     */
    async index() {
        let collections = await TagCollection.with('tags').fetch();

        collections = collections.toJSON()
        .map(collection => new TagCollectionTransformer(collection).toTarget());

        return { collections };
    }

    /**
     * Create/save a new tag collection.
     * POST collections
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @return {object} : The created collection
     */
    async store({ request }) {
        const requestBody = request.only(['tags']);

        const tagCollection = new TagCollection();

        await tagCollection.save();

        await Promise.all(
            uniq(requestBody.tags)
            .map(async requestTag => this.attachTagToCollectionByTagName(tagCollection, requestTag)),
        );

        await tagCollection.save();

        const savedCollection = await TagCollection.where({ _id: tagCollection._id }).with('tags').first();

        return new TagCollectionTransformer(savedCollection.toJSON()).toTarget();
    }

    /**
     * Display a single tag collection.
     * GET collections/:id
     *
     * @param {object} ctx
     * @param {Response} ctx.response
     */
    async show({ params, response }) {
        const tagCollection = await TagCollection.where({ _id: params.id }).with('tags').first();

        if (!tagCollection) {
            return new NotFoundExceptionResponse('tag_collection_not_found').send(response);
        }

        return new TagCollectionTransformer(tagCollection.toJSON()).toTarget();
    }

    /**
     * Update a tag collection.
     * PUT or PATCH collections/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const requestBody = request.only(['tags']);
        const tagCollection = await TagCollection.where({ _id: params.id }).first();

        if (!tagCollection) {
            return new NotFoundExceptionResponse('tag_collection_not_found').send(response);
        }

        await tagCollection.tags().detach();

        await Promise.all(
            uniq(requestBody.tags)
            .map(async requestTag => this.attachTagToCollectionByTagName(tagCollection, requestTag)),
        );

        await tagCollection.save();

        const savedCollection = await TagCollection.where({ _id: tagCollection._id }).with('tags').first();

        return new TagCollectionTransformer(savedCollection.toJSON()).toTarget();
    }

    /**
     * Delete a tag collection with id.
     * DELETE collections/:id
     *
     * @param {object} ctx
     * @param {Parameters} ctx.params
     */
    async destroy({ params, response }) {
        const tagCollection = await TagCollection.where({ _id: params.id }).first();

        if (!tagCollection) {
            return new NotFoundExceptionResponse('tag_collection_not_found').send(response);
        }

        await tagCollection.tags().detach();
        await tagCollection.delete();

        return {};
    }

    /**
     * Attach a tag to the collection
     *
     * @param {TagCollection} tagCollection : TagCollection : The tag collection
     * @param {string} tagName : string : The tag name
     * @returns {Promise<any>} : The attach promise
     */
    async attachTagToCollectionByTagName(tagCollection, tagName) {
        let tag = await Tag
        .where({ name: tagName })
        .first();

        if (!tag) {
            tag = new Tag();
            tag.name = tagName;
            await tag.save();
        }

        await tagCollection.tags().attach(tag._id);
        return Promise.resolve(tag);
    }
}

module.exports = TagCollectionController;
