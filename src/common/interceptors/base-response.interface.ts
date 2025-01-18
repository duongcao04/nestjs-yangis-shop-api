export interface BaseResponseDto<T = any> {
    statusCode: number // HTTP status code
    message: string // Response message
    data?: T // Optional payload of generic type
}
