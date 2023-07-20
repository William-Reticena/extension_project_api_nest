import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '@/modules/user.module'
import { AuthService } from '@/services/auth.service'
import { LocalStrategy } from '@/strategies/local.strategy'
import { JwtStrategy } from '@/strategies/jwt.strategy'
import { AuthController } from '@/controllers/auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
