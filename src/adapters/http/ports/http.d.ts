export interface IHttpRequest {
    params: Record<string, string>
    headers: Record<string, string>
    body: Record<string, unknown>
    query: Record<string, unknown>
    ip: string
}
export interface IHttpResponse {
    code: string
    status: number
    data: Record<string, unknown>
}
