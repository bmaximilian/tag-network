const { Command } = require('@adonisjs/ace');

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
        this.info('Dummy implementation for apiKey:generate command');
    }
}

module.exports = ApiKeyGenerate;
