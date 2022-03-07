import 'dotenv/config'
import cluster from 'cluster'
import numCPUs from 'os'

import { Logger } from '@shared/Logger'

import { Application } from './config/Application'
import { ApplicationConfigs } from './config/ApplicationConfigs'

async function server(): Promise<void> {
    Logger.info('Server started')

    Logger.info('Loading variables and secrets')
    await ApplicationConfigs.load()

    const app = await Application.create()

    if (cluster.isMaster && !ApplicationConfigs.isDevelopment) {
        Logger.info('Master process runing...')

        const cpus = numCPUs.cpus().length
        for (let i = 1; i <= cpus; i += 1) cluster.fork()

        cluster.on('exit', (worker, code, signal) => {
            Logger.warn(`Worker ${worker.process.pid} failed. CODE: [${code}], signal:[${signal}]`)
            Logger.info('Starting a new Worker')
            cluster.fork()
        })
    } else {
        app.listen(ApplicationConfigs.port, () => {
            if (ApplicationConfigs.isDevelopment) {
                Logger.info(`Server is running on port ${ApplicationConfigs.port || 3000}`)
            }
        })
    }
}

server()
