
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 * @class Tag
 */
class Tag extends Model {
    /**
     * Constructor of Tag
     */
    constructor(...args) {
        super(...args);

        this.name = null;
    }
}

module.exports = Tag;
