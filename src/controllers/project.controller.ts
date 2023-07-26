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
import { CreateProjectReqDTO } from '@/dtos/create-project-req.dto'
import { ProjectService } from '@/services/project.service'
import { ResponseDTO } from '@/dtos/response.dto'

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Req() req: any,
    @Body() createProjectReqDTO: CreateProjectReqDTO,
  ): Promise<ResponseDTO> {
    const response = await this.projectService.createProject(
      createProjectReqDTO,
    )

    return new ResponseDTO(
      response,
      'Projeto criado com sucesso',
      'Project created successfully',
      HttpStatus.CREATED,
    )
  }

  @Get()
  async getProjects() {
    // console.log(professorId)

    // return await this.projectService.getProjects(professorId)
    return 'ok'
  }
}
