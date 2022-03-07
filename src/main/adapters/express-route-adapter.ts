import { Request, Response } from 'express'

import { IController } from '@adapters/http/controller/Controller'
import { IHttpRequest, IHttpResponse } from '@adapters/http/ports/http'

export const adaptRoute =
    (controller: IController) =>
    async (req: Request, res: Response): Promise<void> => {
        const httpRequest: IHttpRequest = {
            headers: req.headers as Record<string, string>,
            params: req.params,
            body: req.body,
            query: req.query,
            ip: req.ip
        }
        const httpResponse: IHttpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.status).json({
            ...httpResponse.data
        })
    }
