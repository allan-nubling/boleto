/* eslint-disable max-classes-per-file */
import { IHttpResponse } from '../../ports/http'

export class HttpResponse implements IHttpResponse {
    constructor(readonly code: string, readonly status: number, readonly data: Record<string, unknown>) {}
}

export class Ok extends HttpResponse {
    constructor(data: Record<string, unknown>) {
        super('ok', 200, data)
    }
}

export class Created extends HttpResponse {
    constructor(data: Record<string, unknown>) {
        super('created', 201, data)
    }
}

export class Accepted extends HttpResponse {
    constructor(data: Record<string, unknown>) {
        super('accepted', 202, data)
    }
}

export class NoContent extends HttpResponse {
    constructor(data: Record<string, unknown>) {
        super('no content', 204, data)
    }
}
