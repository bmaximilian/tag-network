
const TagNetwork = use('TagNetwork');
const TagSuggestion = use('TagSuggestion');
const Tag = use('App/Modules/Tags/Models/Tag');
const TagTransformer = use('App/Modules/Tags/Transformers/TagTransformer');

/**
 * @class TagController
 */
class TagController {
    /**
     * Show a list of all tags.
     * GET tags
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index() {
        let tags = await Tag.all();

        tags = tags.toJSON().map(tag => new TagTransformer(tag).toTarget());

        return { tags };
    }

    /**
     * Show a list of tag suggestions.
     * POST tags/suggestions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async suggestions({ request }) {
        const requestBody = request.only(['tags']);

        const tags = await TagSuggestion.get(requestBody.tags);

        return { tags };
    }

    /**
     * Show the tag network.
     * GET tags/network
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async network() {
        const tags = await TagNetwork.getAll();

        return { tags };
    }
}

module.exports = TagController;
