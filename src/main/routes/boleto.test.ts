import { Express } from 'express'
import request from 'supertest'

import { ApplicationConfigs } from '@main/config/ApplicationConfigs'

import { Application } from '../config/Application'

describe('Boleto route tests', () => {
    let app: Express
    beforeAll(async () => {
        await ApplicationConfigs.load()

        app = await Application.create()
    })
    it('Boleto route should not accept a invalid code', async () => {
        const response1 = await request(app).get('/boleto/2129000119211000121090447561740597587000000200')
        expect(response1.status).toEqual(400)
        expect(typeof response1.body.message).toEqual('string')
        const response2 = await request(app).get('/boleto/212900011921100012109044756174059758700000020000')
        expect(response2.status).toEqual(400)
        expect(typeof response2.body.message).toEqual('string')
        const response3 = await request(app).get('/boleto/21290001192110001210904475617405975870000002000a')
        expect(response3.status).toEqual(400)
        expect(typeof response3.body.message).toEqual('string')
    })
    it('Boleto route should return barCode, amount and expirationDate informations', async () => {
        const response = await request(app).get('/boleto/21290001192110001210904475617405975870000002000')
        expect(response.status).toEqual(200)
        expect(response.body.barCode).toBe('21299758700000020000001121100012100447561740')
        expect(response.body.amount).toBe('20.00')
        expect(response.body.expirationDate).toBe('2018-07-16')
    })
})
