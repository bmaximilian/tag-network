
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokensSchema extends Schema {
    up() {
        this.create('tokens', (table) => {
            // table.increments();
            // table.integer('user_id').unsigned().references('id').inTable('users');
            // table.string('token', 255).notNullable().unique().index();
            // table.string('type', 80).notNullable();
            // table.boolean('is_revoked').defaultTo(false);
            // table.timestamps();
            table.index('token_index', { token: 1 }, { unique: true });
        });
    }

    down() {
        this.drop('tokens');
    }
}

module.exports = TokensSchema;
