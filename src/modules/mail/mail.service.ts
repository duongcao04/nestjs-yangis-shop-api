import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { SendMailDto } from './dtos/send-mail.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async sendMail(sendMailDto: SendMailDto) {
        try {
            await this.mailerService.sendMail({
                from: `"Duong Cao" <${this.configService.get('mailer.transport.auth.user')}>`,
                to: sendMailDto.to,
                subject: sendMailDto.subject,
                text: sendMailDto.text,
                html: sendMailDto.html,
            })
        } catch (error) {
            throw new InternalServerErrorException('Send mail failed.')
        }
    }
}
