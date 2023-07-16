import { AuthService } from '@/services/auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from '@/dtos/auth-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    return await this.authService.login(authUserDto);
  }
}
