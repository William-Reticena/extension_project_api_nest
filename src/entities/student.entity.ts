import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '@/shared/user';
import { Email } from '@/entities/email.entity';

@Entity()
export class Student extends User {
  @PrimaryColumn({ type: 'varchar' })
  ra: string;

  @OneToOne(() => Email, () => Student)
  @JoinColumn({ name: 'email_id' })
  emailId: number;
}
