import { AuthService } from '@/services/auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDTO } from '@/dtos/auth-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authUserDto: AuthUserDTO) {
    return await this.authService.login(authUserDto);
  }
}
