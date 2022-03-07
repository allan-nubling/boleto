import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'

import { Router } from './Router'
import { Swagger } from './Swagger'

export class Application {
    static async create(): Promise<Express> {
        const app = express()
        app.use(cors())
        app.use(json())
        app.use(urlencoded({ extended: false }))
        await Router.register(app)
        Swagger.generate(app)
        return app
    }
}
