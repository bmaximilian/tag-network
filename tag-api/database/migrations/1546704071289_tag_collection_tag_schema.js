
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TagCollectionSchema extends Schema {
    up() {
        this.create('tag_collection_tag', (/* table */) => {
            // table.increments();
            // table.timestamps();
        });
    }

    down() {
        this.drop('tag_collection_tag');
    }
}

module.exports = TagCollectionSchema;
