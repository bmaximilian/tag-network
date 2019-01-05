
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const NotAllowedExceptionResponse = use('App/Responses/NotAllowedExceptionResponse');
const NotFoundExceptionResponse = use('App/Responses/NotFoundExceptionResponse');
const ApiKey = use('App/Modules/ApiKeys/Models/ApiKey');

class CheckApiKey {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Function} next
     */
    async handle(ctx, next) {
        const requestKey = ctx.request.header('X-API-KEY');

        if (!requestKey) {
            return new NotAllowedExceptionResponse().send(ctx.response);
        }

        const databaseKey = await ApiKey
        .where({ key: requestKey })
        .first();

        if (!databaseKey) {
            return new NotFoundExceptionResponse('api_key_not_found').send(ctx.response);
        }

        // call next to advance the request
        return next();
    }
}

module.exports = CheckApiKey;
