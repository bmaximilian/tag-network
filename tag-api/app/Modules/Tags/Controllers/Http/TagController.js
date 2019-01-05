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
        return { tags: [] };
    }

    /**
     * Show a list of tag suggestions.
     * POST tags/suggestions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async suggestions() {
        return { tags: [] };
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
        return { tags: [{ id: null, relatedTags: [] }] };
    }
}

module.exports = TagController;
