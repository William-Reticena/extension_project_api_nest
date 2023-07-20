import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/shared/user';
import { Email } from '@/entities/email.entity';
import { Project } from '@/entities/project.entity';

@Entity()
export class Professor extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Email, () => Professor, { cascade: true })
  @JoinColumn({ name: 'email_id' })
  emailId: Email;

  @OneToMany(() => Project, (project) => project.professorId)
  projects: Project[];
}
