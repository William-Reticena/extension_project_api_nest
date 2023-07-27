import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Professor } from './professor.entity'
import { ProjectStatusEnum } from '../helpers/enums'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  description: string

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date

  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.PENDING,
  })
  status: string

  @Column({ type: 'int2' })
  workload: number

  @Column({ type: 'int2', name: 'quantity_vacancies' })
  quantityVacancies: number

  @Column({ type: 'int2', name: 'quantity_vacancies_used', default: 0 })
  quantityVacanciesUsed: number

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Professor, () => Project)
  @JoinColumn({ name: 'professor_id' })
  professorId: Professor
}
