import { Router } from 'express'

import { MakeBoletoControllers } from '@main/factories/MakeBoletoControllers'

import { adaptRoute } from '../adapters/express-route-adapter'

export async function attach(router: Router): Promise<void> {
    const factory = new MakeBoletoControllers()

    /**
     * @typedef BoletoResponse
     * @property {string} barCode - eg: 21299758700000020000001121100012100447561740
     * @property {string} amount - eg: 20.00
     * @property {string} expirationDate - eg: 2018-07-16
     */

    /**
     * @typedef BoletoError
     * @property {string} message - eg: bad request
     */

    /**
     * @group Boleto
     * @route POST /boleto/{code}
     * @param {string} code.param - Código digitavel do boleto (apenas numeros) - eg: 21290001192110001210904475617405975870000002000
     * @returns {BoletoResponse.model} 200 - ok
     * @returns {BoletoError.model} 400 - error
     */
    router.get('/boleto/:code', adaptRoute(await factory.getBarCodeController()))
}
