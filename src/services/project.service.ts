import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  CreateProjectDTO,
  ListAllProjectsDTO,
  UpdateProjectStatusDTO,
} from '@/dtos/request'
import { getWeekOffsetFromNow } from '@/helpers/utils/get-week-offset-from-now'
import { Project } from '@/entities/project.entity'
import { PageEnum, ProjectStatusEnum } from '@/helpers/enums'
import { pageSkipHandler } from '@/helpers/utils/page-skip-handler'
import { pageInfosHandler } from '@/helpers/utils/page-infos-handler'

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

  async updateStatus(updateProjectStatusDTO: UpdateProjectStatusDTO) {
    try {
      const { projectId, status } = updateProjectStatusDTO

      const projectEntity = await this.projectRepository.findOne({
        where: { id: projectId },
      })

      if (!projectEntity)
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND, {
          cause: 'Projeto não encontrado',
        })

      projectEntity.status = status

      return await this.projectRepository.save(projectEntity)
    } catch (error) {
      throw error
    }
  }

  async getProjects(listAllProjectsDTO?: ListAllProjectsDTO) {
    try {
      const { status, page, pageSize } = listAllProjectsDTO

      const actualStatus = status ? status : ProjectStatusEnum.IN_PROGRESS

      const [projects, itemCount] = await this.projectRepository.findAndCount({
        where: { status: actualStatus },
        take: pageSize || PageEnum.PAGE_SIZE_DEFAULT,
        skip: pageSkipHandler(page, pageSize),
      })

      return {
        projects,
        pageInfos: pageInfosHandler(itemCount, page, pageSize),
      }
    } catch (error) {
      throw error
    }
  }

  async deleteProject(projectId: number) {
    try {
      const projectEntity = await this.projectRepository.findOne({
        where: { id: projectId },
      })

      if (!projectEntity)
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND, {
          cause: 'Projeto não encontrado',
        })

      return await this.projectRepository.remove(projectEntity)
    } catch (error) {
      throw error
    }
  }
}
