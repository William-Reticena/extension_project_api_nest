import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Student])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
