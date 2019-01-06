
const { uniq } = require('lodash');

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
            .map(async (requestTag) => {
                let tag = await Tag
                .where({ name: requestTag })
                .first();

                if (!tag) {
                    tag = new Tag();
                    tag.name = requestTag;
                    await tag.save();
                }

                await tagCollection.tags().attach(tag._id);
                return Promise.resolve(tag);
            }),
        );

        await tagCollection.save();

        const savedCollection = await TagCollection.where({ _id: tagCollection._id }).with('tags').first();

        return new TagCollectionTransformer(savedCollection.toJSON()).toTarget();
    }

    /**
     * Update a tag collection.
     * PUT or PATCH collections/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update() {
        return { id: null, tags: [] };
    }
}

module.exports = TagCollectionController;
