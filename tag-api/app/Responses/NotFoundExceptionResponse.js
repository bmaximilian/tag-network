/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const ExceptionResponse = require('./ExceptionResponse');

class NotFoundExceptionResponse extends ExceptionResponse {
    constructor(message = 'not_found') {
        super(message, 404);
    }
}

module.exports = NotFoundExceptionResponse;
