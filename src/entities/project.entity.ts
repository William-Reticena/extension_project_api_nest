import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Professor } from './professor.entity'

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

  @Column({ type: 'varchar' })
  status: string

  @Column({ type: 'int2' })
  workload: number

  @Column({ type: 'int2', name: 'quantity_vacancies' })
  quantityVacancies: number

  @Column({ type: 'int2', name: 'quantity_vacancies_used' })
  quantityVacanciesUsed: number

  @ManyToOne(() => Professor, () => Project)
  @JoinColumn({ name: 'professor_id' })
  professorId: Professor
}
