import { Logger } from '@shared/Logger'

const { NODE_ENV, PORT = 3000, LOG_LEVEL = 1 } = process.env

class EnvironmentManager {
    port = PORT

    isDevelopment = NODE_ENV === 'development' || NODE_ENV === 'test'

    isHomologation = NODE_ENV === 'homologation'

    isProduction = NODE_ENV !== 'development' && NODE_ENV !== 'homologation'

    logLevel = LOG_LEVEL

    async load(): Promise<void> {
        try {
            Object.freeze(this)

            Logger.info('Sercrets and variables loaded')
        } catch (err) {
            Logger.error(err)
        }
    }
}

export const ApplicationConfigs = new EnvironmentManager()
