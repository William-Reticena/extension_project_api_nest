import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/dto/create-user.dto';
import { Professor } from '@/entities/professor.entity';
import { Student } from '@/entities/student.entity';
import { UpdateUserDto } from '@/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Professor> {
    try {
      const { email } = createUserDto;
      const existingStudent = await this.studentRepository.findBy({ email });
      const existingProfessor = await this.professorRepository.findBy({
        email,
      });

      if (existingProfessor.length || existingStudent.length)
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST, {
          cause: 'Email já existente',
        });

      const professorEntity = this.professorRepository.create(createUserDto);

      const newUser = await this.professorRepository.save(professorEntity);

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
