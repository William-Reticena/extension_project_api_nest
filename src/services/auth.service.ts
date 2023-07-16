import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '@/services/user.service';
import { Email } from '@/entities/email.entity';
import { AuthUserDto } from '@/dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    const payload = {
      sub: 'teste',
      email: authUserDto.email,
    };

    return {
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }

  async validateUser(email: string, password: string): Promise<Email> {
    try {
      const credential = await this.userService.findUserByEmail(email);

      const isPasswordValid = compareSync(password, credential.password);
      if (!isPasswordValid)
        throw new HttpException(
          'Invalid credentials',
          HttpStatus.UNAUTHORIZED,
          {
            cause: 'E-mail ou senha inválidos',
          },
        );

      return credential;
    } catch (error) {
      throw error;
    }
  }
}
