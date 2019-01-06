/**
 * Created on 2019-01-06.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

/**
 * @class BaseValidator
 */
class BaseValidator {
    /**
     * Determines if everything should be validated
     *
     * @returns {boolean} : if everything should be validated
     */
    get validateAll() {
        return true;
    }

    /**
     * Executed when the validation fails
     *
     * @param {array} errorMessages : array : The error messages
     * @returns {Promise<*>} : The send promise
     */
    async fails(errorMessages) {
        return this.ctx.response.send({
            errors: errorMessages,
        });
    }
}

module.exports = BaseValidator;
