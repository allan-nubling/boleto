/* eslint-disable no-console */

import { ApplicationConfigs } from '@main/config/ApplicationConfigs'

import { GeneralError } from './Errors'

const reset = () => (ApplicationConfigs.isDevelopment ? '\x1b[0m' : '')
const red = () => (ApplicationConfigs.isDevelopment ? '\x1b[31m' : '')
const yellow = () => (ApplicationConfigs.isDevelopment ? '\x1b[33m' : '')
const cyan = () => (ApplicationConfigs.isDevelopment ? '\x1b[36m' : '')
const magenta = () => (ApplicationConfigs.isDevelopment ? '\x1b[91m' : '')

export enum LogLevel {
    ERROR = 3,
    WARN = 2,
    INFO = 1,
    DEBUG = 0
}

export class Logger {
    static info(...msg: unknown[]): void {
        if (ApplicationConfigs.logLevel <= LogLevel.INFO) {
            console.info(
                `${cyan()}[INFO] ${new Date().toLocaleTimeString('pt-BR', { hour12: false })}${reset()} -`,
                ...msg
            )
        }
    }

    static warn(...msg: unknown[]): void {
        if (ApplicationConfigs.logLevel <= LogLevel.WARN) {
            console.info(
                `${magenta()}[WARN] ${new Date().toLocaleTimeString('pt-BR', { hour12: false })}${reset()} -`,
                ...msg
            )
        }
    }

    static error(err: GeneralError | Error): void {
        if (ApplicationConfigs.logLevel <= LogLevel.ERROR) {
            let message: unknown = err
            const isAMappedError = err instanceof GeneralError
            if (isAMappedError) {
                message = err.log || err.message || JSON.stringify(err.data)
            }

            console.error(
                `${red()}[ERROR] ${new Date().toLocaleTimeString('pt-BR', { hour12: false })}${reset()} -`,
                message,
                err.stack
            )
        }
    }

    static debug(...msg: unknown[]): void {
        if (ApplicationConfigs.logLevel <= LogLevel.DEBUG) {
            console.log(
                `${yellow()}[DEBUG] ${new Date().toLocaleTimeString('pt-BR', { hour12: false })}${reset()} -`,
                ...msg
            )
        }
    }
}
