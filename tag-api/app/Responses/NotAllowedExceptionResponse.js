/**
 * Created on 2019-01-05.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const ExceptionResponse = use('App/Responses/ExceptionResponse');

class NotAllowedExceptionResponse extends ExceptionResponse {
    constructor(message = 'forbidden') {
        super(message, 403);
    }
}

module.exports = NotAllowedExceptionResponse;
