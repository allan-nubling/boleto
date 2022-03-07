/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

export type GeneralErrorParams = {
    data: Record<string, unknown>
    message?: string
    log?: string
}
export class GeneralError extends Error {
    constructor(
        readonly code = 'error',
        readonly status = 500,
        readonly name = 'GeneralError',
        message = 'GeneralError',
        readonly data?: Record<string, unknown>,
        readonly log?: string
    ) {
        super(message)
    }
}

export class BadRequest extends GeneralError {
    constructor({ data, message = 'BadRequest', log }: GeneralErrorParams) {
        super('bad request', 400, 'BadRequest', message, data, log)
    }
}
export class Unauthorized extends GeneralError {
    constructor({ data, message = 'Unauthorized', log }: GeneralErrorParams) {
        super('unauthorized', 401, 'Unauthorized', message, data, log)
    }
}
export class Forbidden extends GeneralError {
    constructor({ data, message = 'Forbidden', log }: GeneralErrorParams) {
        super('forbidden', 403, 'Forbidden', message, data, log)
    }
}
export class NotFound extends GeneralError {
    constructor({ data, message = 'NotFound', log }: GeneralErrorParams) {
        super('not found', 404, 'NotFound', message, data, log)
    }
}
export class AlreadyExists extends GeneralError {
    constructor({ data, message = 'AlreadyExists', log }: GeneralErrorParams) {
        super('already exists', 409, 'AlreadyExists', message, data, log)
    }
}
export class Unprocessable extends GeneralError {
    constructor({ data, message = 'Unprocessable', log }: GeneralErrorParams) {
        super('unprocessable', 422, 'Unprocessable', message, data, log)
    }
}
export class NotImplemented extends GeneralError {
    constructor({ data, message = 'NotImplemented', log }: GeneralErrorParams) {
        super('not implemented', 501, 'NotImplemented', message, data, log)
    }
}
export class ServiceUnavailable extends GeneralError {
    constructor({ data, message = 'ServiceUnavailable', log }: GeneralErrorParams) {
        super('service unavailable', 503, 'ServiceUnavailable', message, data, log)
    }
}
