/* eslint-disable import/no-extraneous-dependencies */
import { Express } from 'express'
import * as swaggerGenerator from 'express-swagger-generator'

import { Logger } from '@shared/Logger'

import { ApplicationConfigs } from './ApplicationConfigs'

type SwaggerGeneratorOptions = {
    swaggerDefinition: {
        info: {
            description: string
            title: string
            version: string
        }
        basePath: string
        produces: string[]
        consumes: string[]
        schemes: ('http' | 'https')[]
        securityDefinitions?: {
            JWT?: {
                type: string
                in?: string
                name?: string
                description?: string
                flow?: string
                authorizationUrl?: string
                tokenUrl?: string
                scopes?: ('read' | 'write' | 'admin')[]
            }
        }
    }
    route: {
        url: string
        docs: string
    }
    basedir: string
    files: string[]
}
export class Swagger {
    static getOptions(): SwaggerGeneratorOptions {
        return {
            swaggerDefinition: {
                info: {
                    description: 'Api para gerar código de barras com a linha digitavel de boletos',
                    title: 'Boleto',
                    version: process.env.npm_package_version
                },
                basePath: '/',
                produces: ['application/json'],
                consumes: ['application/json'],
                schemes: ['http', 'https']
            },
            route: {
                url: '/docs',
                docs: '/docs.json'
            },
            basedir: __dirname,
            files: ['../routes/*.{js,ts}']
        }
    }

    static async generate(app: Express): Promise<void> {
        if (ApplicationConfigs.isProduction) return
        const expressSwagger = swaggerGenerator.default(app)
        const apiDocsData = expressSwagger(Swagger.getOptions())
        const path = 'docs'
        Logger.info(`Docs avaiable on http://localhost:${ApplicationConfigs.port}/${path}`)

        if (ApplicationConfigs.isDevelopment) {
            const fs = await import('fs')
            const json2yaml = await import('json2yaml')
            const swagger2openapi = await import('swagger2openapi')

            swagger2openapi.convertObj(
                apiDocsData,
                {
                    laxDefaults: true,
                    laxurls: true,
                    prevalidate: true
                },
                (err: Error, options: { openapi: unknown }) => {
                    if (err) return Logger.warn(`Cannot generate ${path}.yml`)

                    // eslint-disable-next-line consistent-return
                    return fs.writeFile(`${path}.yml`, json2yaml.stringify(options.openapi), error => {
                        if (error) return Logger.warn(`Cannot generate ${path}.yml`)
                    })
                }
            )
        }
    }
}
