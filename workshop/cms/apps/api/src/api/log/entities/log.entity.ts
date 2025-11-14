import { ColumnMeta } from 'src/core/content-metadata'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('logs')
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  api: string

  @ColumnMeta({ editable: false })
  @Column('text', { name: 'test_name', default: 'xxx', })
  testName: string
}
