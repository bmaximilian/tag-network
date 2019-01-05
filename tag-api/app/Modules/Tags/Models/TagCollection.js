
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 * @class TagCollection
 */
class TagCollection extends Model {
    tags() {
        return this
        .belongsToMany('App/Modules/Tags/Models/Tag', 'tag_collection_id', 'tag_id', '_id', '_id');
        // .pivotTable('tag_collection_tag');
    }
}

module.exports = TagCollection;
