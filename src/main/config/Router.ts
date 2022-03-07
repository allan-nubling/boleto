import { Express, Router as ExpressRouter } from 'express'
import { readdirSync } from 'fs'

export class Router {
    static async register(app: Express): Promise<void> {
        const router = ExpressRouter()
        app.use('/', router)
        readdirSync(`${__dirname}/../routes`).forEach(async file => {
            if (!file.includes('.test') && !file.includes('.map')) {
                const { attach } = await import(`../routes/${file}`)
                await attach(router)
            }
        })
    }
}
