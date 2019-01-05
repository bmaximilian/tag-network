
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            // table.increments();
            // table.string('username', 80).notNullable().unique();
            // table.string('email', 254).notNullable().unique();
            // table.string('password', 60).notNullable();
            // table.timestamps();
            table.index('email_index', { email: 1 }, { unique: true });
            table.index('username_index', { username: 1 }, { unique: true });
        });
    }

    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
