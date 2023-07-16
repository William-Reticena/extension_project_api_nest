import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/dto/create-user.dto';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';
import { Email } from '@/entities/email.entity';
import { UpdateUserDto } from '@/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Professor | Student> {
    try {
      const { email, ra, role } = createUserDto;

      if (!ra && role === 'student')
        throw new HttpException('RA not provided', HttpStatus.BAD_REQUEST, {
          cause: 'RA não informado',
        });

      const existingUser = await this.emailRepository.findOneBy({ email });

      if (existingUser)
        throw new HttpException(
          'Email already in use',
          HttpStatus.BAD_REQUEST,
          {
            cause: 'Email já está em uso',
          },
        );

      let newUser: Professor | Student;
      await this.emailRepository.manager.transaction(async (manager) => {
        const emailEntity = this.emailRepository.create({ email });
        const newEmail = await manager.save(emailEntity);

        if (role === 'professor')
          return await manager.getRepository(Professor).save({
            ...createUserDto,
            emailId: newEmail.id,
          });
        else
          return await manager.getRepository(Student).save({
            ...createUserDto,
            emailId: newEmail.id,
          });
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(): Promise<Professor[]> {
    try {
      const users = await this.professorRepository.find();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(userId?: number): Promise<Professor> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Professor> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        });

      const updatedUser = await this.professorRepository.update(
        { id: userId },
        updateUserDto,
      );

      console.log(updatedUser);

      return updatedUser.raw[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        });

      await this.professorRepository.delete({ id: userId });
    } catch (error) {
      throw error;
    }
  }
}
