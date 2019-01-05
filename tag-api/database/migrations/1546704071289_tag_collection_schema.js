
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TagCollectionSchema extends Schema {
    up() {
        this.create('tag_collections', (/* table */) => {
            // table.increments();
            // table.timestamps();
        });
    }

    down() {
        this.drop('tag_collections');
    }
}

module.exports = TagCollectionSchema;
