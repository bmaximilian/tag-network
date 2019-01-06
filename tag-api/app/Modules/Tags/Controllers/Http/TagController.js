
const { includes } = require('lodash');

const Tag = use('App/Modules/Tags/Models/Tag');
const TagCollection = use('App/Modules/Tags/Models/TagCollection');
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
        const tags = await Tag.all();
        let tagCollections = await TagCollection.with('tags').fetch();

        tagCollections = tagCollections.toJSON();

        const tagsWithRelations = tags.toJSON().reduce((accumulator, currentTag) => {
            const relatedTags = tagCollections.reduce((relatedAccumulator, currentTagCollection) => {
                if (!includes(currentTagCollection.tags.map(tag => tag.name), currentTag.name)) {
                    return relatedAccumulator;
                }

                return relatedAccumulator.concat(
                    currentTagCollection.tags
                    .filter((tag) => {
                        return !includes(relatedAccumulator.map(relatedTag => relatedTag._id), tag._id)
                            && tag._id !== currentTag._id;
                    }),
                );
            }, []);

            return [
                ...accumulator,
                {
                    ...new TagTransformer(currentTag).toTarget(),
                    relatedTags: relatedTags.map(tag => new TagTransformer(tag).toTarget()),
                },
            ];
        }, []);

        return { tags: tagsWithRelations };
    }
}

module.exports = TagController;
