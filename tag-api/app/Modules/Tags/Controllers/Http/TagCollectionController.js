
const TagCollection = use('App/Modules/Tags/Models/TagCollection');
const TagCollectionTransformer = use('App/Modules/Tags/Transformers/TagCollectionTransformer');

/**
 * @class TagCollectionController
 */
class TagCollectionController {
    /**
     * Show a list of all tag collections.
     * GET collections
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index() {
        const collections = await TagCollection.with('tags').fetch();

        return collections.toJSON()
        .map(collection => new TagCollectionTransformer(collection).toTarget());
    }

    /**
     * Create/save a new tag collection.
     * POST collections
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {User} ctx.user
     */
    async store() {
        return { id: null, tags: [] };
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
