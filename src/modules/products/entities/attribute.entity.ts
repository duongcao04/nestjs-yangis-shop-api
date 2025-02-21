import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'
import { AttributeValue } from './attribute-value.entity'
import { Base } from '../../base/base.entity'

@Entity('attributes')
export class Attribute extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50 })
    name: string

    @OneToMany(() => AttributeValue, (value) => value.attribute)
    values: AttributeValue[]
}
