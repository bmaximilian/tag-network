const { Command } = require('@adonisjs/ace');

/**
 * @class TokenGenerate
 */
class TokenGenerate extends Command {
    /**
     * The command signature
     *
     * @returns {string} : The signature
     */
    static get signature() {
        return 'token:generate';
    }

    /**
     * The command description
     *
     * @returns {string} : The description
     */
    static get description() {
        return 'Generate an API token';
    }

    /**
     * Executes the command
     *
     * @param {object} args : object : The command args
     * @param {object} options : object : The command options
     * @returns {Promise<void>} : The executed command
     */
    async handle() {
        this.info('Dummy implementation for token:generate command');
    }
}

module.exports = TokenGenerate;
