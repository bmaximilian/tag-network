/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { get } = require('lodash');

const BaseTransformer = use('App/Transformers/BaseTransformer');

class TagTransformer extends BaseTransformer {
    /**
     * Transforms a tag to a JSON response
     *
     * @returns {object}: The transformed tag
     */
    transform() {
        return {
            id: get(this.source, '_id', null),
            name: get(this.source, 'name', null),
            createdAt: get(this.source, 'created_at', null),
            updatedAt: get(this.source, 'updated_at', null),
        };
    }
}

module.exports = TagTransformer;
