import { Entity, PrimaryColumn } from 'typeorm';
import { User } from '@/shared/user';

@Entity()
export class Student extends User {
  @PrimaryColumn({ type: 'varchar' })
  ra: string;
}
