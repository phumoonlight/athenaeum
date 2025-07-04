import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  content: string
}
