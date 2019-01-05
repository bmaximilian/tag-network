const { Command } = require('@adonisjs/ace');

const Database = use('Database');
const ApiKey = use('App/Modules/ApiKeys/Models/ApiKey');

/**
 * @class ApiKeyGenerate
 */
class ApiKeyGenerate extends Command {
    /**
     * The command signature
     *
     * @returns {string} : The signature
     */
    static get signature() {
        return 'apiKey:get';
    }

    /**
     * The command description
     *
     * @returns {string} : The description
     */
    static get description() {
        return 'Print the current API key';
    }

    /**
     * Executes the command
     *
     * @param {object} args : object : The command args
     * @param {object} options : object : The command options
     * @returns {Promise<void>} : The executed command
     */
    async handle() {
        const notExpiredKeys = await ApiKey
        .where({ expired_at: null })
        .fetch();

        const keys = notExpiredKeys.toJSON().map(databaseKey => databaseKey.key);

        this.info(`Active API keys:\n\t${keys.join('\n\t')}`);

        await Database.close();
        return Promise.resolve();
    }
}

module.exports = ApiKeyGenerate;
