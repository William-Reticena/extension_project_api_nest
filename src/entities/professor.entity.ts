import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/shared/user';
import { Project } from './project.entity';

@Entity()
export class Professor extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Project, () => Professor)
  projects: Project[];
}
