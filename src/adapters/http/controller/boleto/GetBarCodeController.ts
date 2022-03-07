import { BarCodeGeneration } from '@core/useCases/Boleto/BarCodeGeneration'
import { BadRequest } from '@shared/Errors'

import { IHttpRequest, IHttpResponse } from '../../ports/http'
import { IController } from '../Controller'
import { HttpHelpers } from '../helpers'
import { Ok } from '../helpers/HttpResponses'

interface IRequest extends IHttpRequest {
    params: {
        code: string
    }
}

export class GetBarCodeController implements IController {
    constructor(private readonly barCodeGeneration: BarCodeGeneration) {}

    async handle(req: IRequest): Promise<IHttpResponse> {
        const { params } = req
        try {
            if (params.code.match(/\D/))
                throw new BadRequest({ data: { message: 'a linha digitavel aceita apenas números' } })
            if (params.code.length < 47)
                throw new BadRequest({ data: { message: 'a linha digitada é menor que o esperado' } })
            if (params.code.length > 48)
                throw new BadRequest({ data: { message: 'a linha digitada é menor que o esperado' } })

            const result = await this.barCodeGeneration.execute(params.code)

            return new Ok(result)
        } catch (err) {
            return HttpHelpers.handleErrors(err)
        }
    }
}
