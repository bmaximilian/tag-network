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
    Route.get('tags', () => { return { tags: [] }; });

    Route.get('collections', () => { return { collections: [] }; });
    Route.post('collections', () => { return { id: null, tags: [] }; });

    Route.post('tags/suggestions', () => { return { tags: [] }; });
    Route.get('tags/network', () => { return { tags: [{ id: null, tags: [] }] }; });

    /* Also add a websocket channel that emits when a tag collection is added to the network */
})
.prefix('api');
// .middleware(['requireApiKey']);
