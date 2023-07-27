import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateProjectDTO } from '@/dtos/request'
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
  async getProjects(@Query('professorId') professorId: string) {
    console.log(professorId)
    console.log('ok')

    // return await this.projectService.getProjects(professorId)
    return 'ok'
  }
}
