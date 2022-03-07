import { IHttpRequest, IHttpResponse } from '../ports/http'

export interface IController {
    handle: (req: IHttpRequest) => Promise<IHttpResponse>
}
