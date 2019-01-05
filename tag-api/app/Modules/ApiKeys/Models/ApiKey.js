
const crypto = require('crypto');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 * @class ApiKey
 */
class ApiKey extends Model {
    /**
     * Constructor of ApiKey
     */
    constructor(...args) {
        super(...args);

        this.key = null;
        this.expired_at = null;
    }

    /**
     * Generates a new key
     *
     * @param {string|null} key : string|null : The new key
     * @param {number} length : number : The length of the generated key
     * @return {ApiKey} : The model instance
     */
    generateKey(key = null, length = 20) {
        if (key) {
            this.key = key;
            return this;
        }

        this.key = crypto.randomBytes(length / 2).toString('hex');
        return this;
    }

    /**
     * Sets the expired date
     *
     * @return {ApiKey} : The model instance
     */
    setExpired() {
        this.expired_at = new Date().toISOString();
        return this;
    }
}

module.exports = ApiKey;
