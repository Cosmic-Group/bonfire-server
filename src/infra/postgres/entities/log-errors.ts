import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'log_errors' })
export class PgLogErrors {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  stack: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
