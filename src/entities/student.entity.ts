import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from '@/entities/shared/user.shared.entity'
import { Email } from '@/entities/email.entity'

@Entity()
export class Student extends User {
  @PrimaryColumn({ type: 'varchar', unique: true })
  ra: string

  @OneToOne(() => Email, () => Student, { cascade: true })
  @JoinColumn({ name: 'email_id' })
  emailId: Email
}
