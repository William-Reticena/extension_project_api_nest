import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '@/services/user.service'
import { Professor } from '@/entities/professor.entity'
import { Student } from '@/entities/student.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    })
  }

  async validate(payload: {
    sub: string
    email: string
  }): Promise<(Professor & { role: string }) | (Student & { role: string })> {
    const credentials = await this.userService.findUserByEmail(payload.email)

    const userEntity = await this.userService.findUserByEmailId(credentials.id)

    let role = 'student'
    if (userEntity instanceof Professor) {
      role = 'professor'
    }

    const user = { ...userEntity, role }

    return user
  }
}
