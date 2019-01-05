/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

/**
 * @class BaseTransformer
 */
class BaseTransformer {
    /**
     * Constructor of BaseTransformer
     *
     * @param {any} source : any : The source
     * @param {object} additions? : object : possible additions to the source
     */
    constructor(source, additions = null) {
        this.source = source;
        this.additions = additions;
    }

    /**
     * Transforms the source
     *
     * @returns {*} : The transformed source
     */
    transform(additions) { // eslint-disable-line no-unused-vars
        return this.source;
    }

    /**
     * Could prepare the transformed source
     *
     * @returns {*} : The prepared transformed source
     */
    toTarget(additions) {
        return this.transform(additions);
    }
}

module.exports = BaseTransformer;
