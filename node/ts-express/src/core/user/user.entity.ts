import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('training_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'first_name', type: 'nvarchar' })
  firstName!: string

  @Column({ name: 'last_name', type: 'nvarchar' })
  lastName!: string

  @Column({ name: 'age', type: 'tinyint' })
  age!: number
}
