/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

/*
 |--------------------------------------------------------------------------
 | Routes
 |--------------------------------------------------------------------------
 |
 | Http routes are entry points to your web application. You can create
 | routes for different URLs and bind Controller actions to them.
 |
 | A complete guide on routing is available here.
 | http://adonisjs.com/docs/4.0/routing
 |
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
    Route.get('tags', 'App/Modules/Tags/Controllers/Http/TagController.index');

    Route.get('collections', 'App/Modules/Tags/Controllers/Http/TagCollectionController.index');
    Route.post('collections', 'App/Modules/Tags/Controllers/Http/TagCollectionController.store');
    Route.patch('collections/:id', 'App/Modules/Tags/Controllers/Http/TagCollectionController.update');
    Route.put('collections/:id', 'App/Modules/Tags/Controllers/Http/TagCollectionController.update');

    Route.post('tags/suggestions', 'App/Modules/Tags/Controllers/Http/TagController.suggestions');
    Route.get('tags/network', 'App/Modules/Tags/Controllers/Http/TagController.network');

    /* Also add a websocket channel that emits when a tag collection is added to the network */
})
.prefix('api');
// .middleware(['requireApiKey']);
