import { GetBarCodeController } from '@adapters/http/controller/boleto/GetBarCodeController'
import { IController } from '@adapters/http/controller/Controller'
import { BarCodeGeneration } from '@core/useCases/Boleto/BarCodeGeneration'

export class MakeBoletoControllers {
    async getBarCodeController(): Promise<IController> {
        const barCodeGeneration = new BarCodeGeneration()
        return new GetBarCodeController(barCodeGeneration)
    }
}
