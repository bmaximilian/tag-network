
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
            return new TagSuggestionService(Config);
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
        // TODO: Train the network with existing data
    }
}

module.exports = TagSuggestionProvider;
