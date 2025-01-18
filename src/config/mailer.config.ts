import { MailerOptions } from '@nestjs-modules/mailer'

export const mailerConfig = (): MailerOptions => ({
    transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        ignoreTLS: true,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    },
})
