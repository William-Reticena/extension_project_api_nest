import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@/services/user.service';
import { Professor } from '@/entities/professor.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<Professor> {
    const credentials = await this.userService.findUserByEmail(payload.email);

    const user = await this.userService.findUserByEmailId(credentials.id);

    return { ...user };
  }
}
