
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TagCollectionSchema extends Schema {
    up() {
        this.create('tags', (table) => {
            table.index('name_index', { name: 1 }, { unique: true });
            // table.increments();
            // table.timestamps();
        });
    }

    down() {
        this.drop('tags');
    }
}

module.exports = TagCollectionSchema;
