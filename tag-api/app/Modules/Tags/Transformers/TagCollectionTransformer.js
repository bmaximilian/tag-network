/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { get, isEmpty, isArray } = require('lodash');

const BaseTransformer = use('App/Transformers/BaseTransformer');
const TagTransformer = use('App/Modules/Tags/Transformers/TagTransformer');

class TagCollectionTransformer extends BaseTransformer {
    /**
     * Transforms a tag collection to a JSON response
     *
     * @returns {object}: The transformed tag
     */
    transform() {
        let tags = get(this.source, 'tags', []);

        if (!isEmpty(tags) && isArray(tags)) {
            tags = tags.map(tag => new TagTransformer(tag).toTarget());
        }

        return {
            id: get(this.source, '_id', null),
            createdAt: get(this.source, 'created_at', null),
            updatedAt: get(this.source, 'updated_at', null),
            tags,
        };
    }
}

module.exports = TagCollectionTransformer;
