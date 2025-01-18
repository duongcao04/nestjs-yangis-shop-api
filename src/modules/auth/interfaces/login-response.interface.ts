import { JwtToken } from './jwt-token.interface'

export interface LoginResponse {
    access_token: JwtToken
    refresh_token: string
}
