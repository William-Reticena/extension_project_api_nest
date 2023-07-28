import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  CreateProjectDTO,
  ListAllProjectsDTO,
  UpdateProjectStatusDTO,
} from '@/dtos/request'
import { ResponseDTO } from '@/dtos/response'
import { ProjectService } from '@/services/project.service'
import { RoleGuard } from '@/guards/role.guard'

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(RoleGuard(['professor']))
  @Post()
  async createProject(
    @Body() createProjectDTO: CreateProjectDTO,
  ): Promise<ResponseDTO> {
    const response = await this.projectService.createProject(createProjectDTO)

    return new ResponseDTO(
      response,
      'Projeto criado com sucesso',
      'Project created successfully',
      HttpStatus.CREATED,
    )
  }

  @UseGuards(RoleGuard(['professor']))
  @Get('list')
  async getProjects(
    @Query() listAllProjectsDTO?: ListAllProjectsDTO,
  ): Promise<ResponseDTO> {
    const response = await this.projectService.getProjects(listAllProjectsDTO)

    return new ResponseDTO(
      response,
      'Projetos listados com sucesso',
      'Projects listed successfully',
      HttpStatus.OK,
    )
  }

  @Patch('update-status')
  async updateStatus(
    @Body() updateProjectStatusDTO: UpdateProjectStatusDTO,
  ): Promise<ResponseDTO> {
    const response = await this.projectService.updateStatus(
      updateProjectStatusDTO,
    )

    return new ResponseDTO(
      response,
      'Status do projeto atualizado com sucesso',
      'Project status updated successfully',
      HttpStatus.OK,
    )
  }

  @UseGuards(RoleGuard(['professor']))
  @Delete(':projectId')
  async deleteProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ResponseDTO> {
    const response = await this.projectService.deleteProject(projectId)

    return new ResponseDTO(
      response,
      'Projeto deletado com sucesso',
      'Project deleted successfully',
      HttpStatus.OK,
    )
  }
}
