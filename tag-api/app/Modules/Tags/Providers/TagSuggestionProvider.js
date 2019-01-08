
const { ServiceProvider } = require('@adonisjs/fold');

const TagSuggestionService = use('App/Modules/Tags/Services/TagSuggestionService');

class TagSuggestionProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('TagSuggestion', () => {
            const Config = this.app.use('Adonis/Src/Config');
            const TagNetwork = this.app.use('TagNetwork');
            const Logger = this.app.use('Logger');

            return new TagSuggestionService(Config, TagNetwork, Logger);
        });
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        // this.app.use('TagSuggestion').train();
    }
}

module.exports = TagSuggestionProvider;
