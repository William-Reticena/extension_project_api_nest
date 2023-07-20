import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { generateRandomNumber } from '../helpers/utils/random-number-generator'

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  @Post()
  async createProject(@Req() req: any) {
    console.log(generateRandomNumber(0, 100))

    return 'createProject'
  }
}
