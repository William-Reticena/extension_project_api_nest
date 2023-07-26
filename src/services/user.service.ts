import { InjectRepository } from '@nestjs/typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateUserReqDTO } from '@/dtos/create-user-req.dto'
import { Professor } from '@/entities/professor.entity'
import { Student } from '@/entities/student.entity'
import { Email } from '@/entities/email.entity'
import { UpdateUserReqDTO } from '@/dtos/update-user-req.dto'
import { generateRA } from '../helpers/utils/ra-generator'

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

  async createUser(
    createUserDTO: CreateUserReqDTO,
  ): Promise<Professor | Student> {
    try {
      const { email, role, password } = createUserDTO

      const existingUser = await this.emailRepository.findOneBy({ email })

      if (existingUser)
        throw new HttpException(
          'Email already in use',
          HttpStatus.BAD_REQUEST,
          {
            cause: 'Email já está em uso',
          },
        )

      const newUser = await this.emailRepository.manager.transaction(
        async (manager) => {
          const emailEntity = this.emailRepository.create({ email, password })
          const newEmail = await manager.save(emailEntity)

          if (role === 'professor') {
            const professorRepository = manager.getRepository(Professor)

            const newProfessor = professorRepository.create({
              ...createUserDTO,
              emailId: newEmail,
            })

            return await professorRepository.save(newProfessor)
          } else {
            const studentRepository = manager.getRepository(Student)

            const RAsRegistered = await studentRepository.find({
              select: ['ra'],
            })

            const RAGenerated = generateRA(
              RAsRegistered.map((student) => Number(student.ra)),
            )

            const newStudent = studentRepository.create({
              ...createUserDTO,
              ra: String(RAGenerated),
              emailId: newEmail,
            })

            return await studentRepository.save(newStudent)
          }
        },
      )

      return newUser
    } catch (error) {
      throw error
    }
  }

  async findAllUsers(): Promise<Professor[]> {
    try {
      const users = await this.professorRepository.find()

      return users
    } catch (error) {
      throw error
    }
  }

  async findUserById(userId?: number): Promise<Professor> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId })

      return user
    } catch (error) {
      throw error
    }
  }

  async updateUser(
    userId: number,
    updateUserDTO: UpdateUserReqDTO,
  ): Promise<Professor> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId })

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        })

      const updatedUser = await this.professorRepository.update(
        { id: userId },
        updateUserDTO,
      )

      return updatedUser.raw[0]
    } catch (error) {
      throw error
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const user = await this.professorRepository.findOneBy({ id: userId })

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        })

      await this.professorRepository.delete({ id: userId })
    } catch (error) {
      throw error
    }
  }

  async findUserByEmail(email: string): Promise<Email> {
    try {
      const user = await this.emailRepository.findOneBy({ email })

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND, {
          cause: 'Usuário não encontrado',
        })

      return user
    } catch (error) {
      throw error
    }
  }

  async findUserByEmailId(emailId: number): Promise<Professor | Student> {
    try {
      const isProfessor = await this.professorRepository.findOneBy({
        emailId: { id: emailId },
      })

      if (isProfessor) return isProfessor

      const isStudent = await this.studentRepository.findOneBy({
        emailId: { id: emailId },
      })

      return isStudent
    } catch (error) {
      throw error
    }
  }
}
