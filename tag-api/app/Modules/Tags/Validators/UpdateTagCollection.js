/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const BlogValidator = use('App/Validators/BaseValidator');

/**
 * @class UpdateTagCollection
 */
class UpdateTagCollection extends BlogValidator {
    /**
     * The validation rules
     *
     * @returns {object}
     */
    get rules() {
        return {
            tags: 'array|required|min:1',
            'tags.*': 'string',
        };
    }
}

module.exports = UpdateTagCollection;
