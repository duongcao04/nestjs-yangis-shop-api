import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
    constructor() {}
    getHello() {
        const author = JSON.stringify({
            message:
                'Welcome to Yangis Shop RESTful API. You can read the documentation at README.md',
            website: 'https://shop.yangis.dev',
            author: 'Cao Hai Duong',
            email: 'caohaiduong04@gmail.com',
            github: 'https://github.com/haiduongg',
        })
        return author
    }
}
