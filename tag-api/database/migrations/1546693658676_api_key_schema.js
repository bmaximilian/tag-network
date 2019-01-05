
const Schema = use('Schema');

class ApiKeySchema extends Schema {
    up() {
        this.create('api_keys', (table) => {
            // table.increments();
            table.index('key_index', { key: 1 }, { unique: true });
            table.index('expired_at_index', { expired_at: 1 }, { unique: true });
            // table.timestamps();
        });
    }

    down() {
        this.drop('api_keys');
    }
}

module.exports = ApiKeySchema;
