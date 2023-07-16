import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @OneToOne(() => Professor, () => Email)
  professor: Professor;

  @OneToOne(() => Student, () => Email)
  student: Student;
}
