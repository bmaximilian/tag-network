
const { ServiceProvider } = require('@adonisjs/fold');

const TagNetworkService = use('App/Modules/Tags/Services/TagNetworkService');

class TagNetworkProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('TagNetwork', () => {
            const Config = this.app.use('Adonis/Src/Config');
            const Redis = this.app.use('Adonis/Addons/Redis');
            const Tag = this.app.use('App/Modules/Tags/Models/Tag');
            const TagCollection = this.app.use('App/Modules/Tags/Models/TagCollection');

            return new TagNetworkService(Config, Redis, Tag, TagCollection);
        });
    }
}

module.exports = TagNetworkProvider;
