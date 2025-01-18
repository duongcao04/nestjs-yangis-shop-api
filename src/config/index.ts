import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { dbConfig } from './database.config'
import { MailerOptions } from '@nestjs-modules/mailer'
import { mailerConfig } from './mailer.config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { jwtConfig } from './jwt.config'

interface iConfig {
    node_env: string
    app_url: string
    port: number
    database: PostgresConnectionOptions
    mailer: MailerOptions
    jwt: JwtModuleOptions
}

export default (): Partial<iConfig> => ({
    node_env: process.env.NODE_ENV || 'development',
    app_url: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
    database: dbConfig(),
    mailer: mailerConfig(),
    jwt: jwtConfig(),
})
