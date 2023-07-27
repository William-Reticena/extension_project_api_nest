import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProjectDTO } from '@/dtos/request'
import { getWeekOffsetFromNow } from '@/helpers/utils/get-week-offset-from-now'
import { Project } from '@/entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDTO: CreateProjectDTO) {
    try {
      const { startDate, endDate } = createProjectDTO

      if (new Date(startDate) < getWeekOffsetFromNow())
        throw new HttpException(
          'Start date must be at least 1 week from now',
          HttpStatus.BAD_REQUEST,
          {
            cause:
              'Data de início deve ser pelo menos 1 semana a partir de hoje',
          },
        )

      if (new Date(endDate) < getWeekOffsetFromNow(2))
        throw new HttpException(
          'End date must be at least 2 weeks from now',
          HttpStatus.BAD_REQUEST,
          {
            cause:
              'Data de término deve ser pelo menos 2 semanas a partir de hoje',
          },
        )

      const newProjectEntity = this.projectRepository.create({
        ...createProjectDTO,
        professorId: { id: createProjectDTO.professorId },
      })

      return await this.projectRepository.save(newProjectEntity)
    } catch (error) {
      throw error
    }
  }

  async getProjects(professorId: string) {
    console.log(professorId)
  }
}
