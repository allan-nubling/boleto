export class EventBase {
    readonly resource: string

    readonly system: string

    readonly module: string

    readonly cpf: string

    readonly ip: string

    readonly data: string

    constructor({
        resource,
        system,
        module,
        cpf,
        ip,
        data
    }: {
        resource: string
        system: string
        module: string
        cpf: string
        ip: string
        data: unknown
    }) {
        this.resource = resource
        this.system = system
        this.module = module
        this.cpf = cpf?.replace(/\D/g, '')
        this.ip = ip
        this.data = JSON.stringify(data)
    }
}

export type EventParams = {
    base: EventBase
    message: string
}

export interface IEventsLogger {
    info: (params: EventParams) => void
    error: (params: EventParams) => void
    allowed: (params: EventParams) => void
    denied: (params: EventParams) => void
}
