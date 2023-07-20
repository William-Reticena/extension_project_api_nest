import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';
import { Email } from '@/entities/email.entity';
import { UpdateUserDto } from '@/dtos/update-user.dto';

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
      const { email, ra, role, password } = createUserDto;

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

      const newUser = await this.emailRepository.manager.transaction(
        async (manager) => {
          const emailEntity = this.emailRepository.create({ email, password });
          const newEmail = await manager.save(emailEntity);

          if (role === 'professor') {
            const newProfessor = manager.getRepository(Professor).create({
              ...createUserDto,
              emailId: newEmail,
            });

            return await manager.getRepository(Professor).save(newProfessor);
          } else {
            const newStudent = manager.getRepository(Student).create({
              ...createUserDto,
              emailId: newEmail,
            });

            console.log(newStudent);

            return await manager.getRepository(Student).save(newStudent);
          }
        },
      );

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

  async findUserByEmail(email: string): Promise<Email> {
    try {
      const user = await this.emailRepository.findOneBy({ email });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmailId(emailId: number): Promise<Professor | Student> {
    console.log(emailId);

    try {
      const isProfessor = await this.professorRepository.findOneBy({
        emailId: { id: emailId },
      });

      if (isProfessor) return isProfessor;

      const isStudent = await this.studentRepository.findOneBy({
        emailId: { id: emailId },
      });

      return isStudent;
    } catch (error) {
      throw error;
    }
  }
}
