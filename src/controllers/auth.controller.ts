import { AuthService } from '@/services/auth.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthUserReqDTO } from '@/dtos/auth-user-req.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authUserDto: AuthUserReqDTO) {
    return await this.authService.login(authUserDto)
  }
}
