import { JwtModuleOptions } from '@nestjs/jwt'

export const jwtConfig = (): JwtModuleOptions => {
    return {
        global: true,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_S,
        },
    }
}
