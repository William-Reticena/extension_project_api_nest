import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class User {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', name: 'token_validation', nullable: true })
  tokenValidation: string;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;
}
