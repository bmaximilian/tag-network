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
        return 'apiKey:generate';
    }

    /**
     * The command description
     *
     * @returns {string} : The description
     */
    static get description() {
        return 'Generate an API Key';
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

        await Promise.all(
            notExpiredKeys.rows
            .map((key) => {
                key.setExpired();
                return key;
            })
            .map(key => key.save()),
        );

        const newKey = new ApiKey();
        newKey.generateKey();
        await newKey.save();

        this.info(`Generated new API key: ${newKey.key}`);

        await Database.close();
        return Promise.resolve();
    }
}

module.exports = ApiKeyGenerate;
