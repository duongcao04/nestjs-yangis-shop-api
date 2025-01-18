import { Injectable } from '@nestjs/common'
import { Base } from './base.entity'
import { Repository } from 'typeorm'

Injectable()
export class BaseService<Entity extends Base> {
    constructor(protected repo: Repository<Entity>) {}
}
