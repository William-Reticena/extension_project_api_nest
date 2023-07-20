import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => Professor, () => Email)
  professor: Professor;

  @OneToOne(() => Student, () => Email)
  student: Student;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
