import { GeneralError } from '@shared/Errors'
import { Logger } from '@shared/Logger'

import { IHttpResponse } from '../../ports/http'
import { HttpResponse } from './HttpResponses'

export class HttpHelpers {
    static handleErrors(error: GeneralError | Error): IHttpResponse {
        if (error instanceof GeneralError) {
            if (error.status >= 500) {
                Logger.error(error)
            }
            return new HttpResponse(error.code, error.status, { ...error.data })
        }
        Logger.error(error)
        return new HttpResponse('internal server error', 500, {})
    }
}
