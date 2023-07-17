import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  @Post()
  async createProject(@Req() req: any) {
    console.log(req);

    return 'createProject';
  }
}
