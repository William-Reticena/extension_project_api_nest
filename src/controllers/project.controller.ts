import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateProjectDTO, UpdateProjectStatusDTO } from '@/dtos/request'
import { ResponseDTO } from '@/dtos/response'
import { ProjectService } from '@/services/project.service'

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Req() req: any,
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

  @Get('all')
  async getProjects(
    @Req() req: any,
    @Query('professorId') professorId: string,
  ) {
    return 'ok'
  }

  @Patch('update-status')
  async updateStatus(@Body() updateProjectStatusDTO: UpdateProjectStatusDTO) {
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
}
