import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'
import { passwordRegex } from '@/helpers/regexes/password'

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MinLength(3, { message: 'Last name must be at least 3 characters' })
  readonly lastName?: string

  @IsOptional()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email?: string

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @MinLength(11, { message: 'Phone must be at least 11 characters' })
  readonly phone?: string

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @Matches(passwordRegex, {
    message:
      'Password must be at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  readonly password?: string
}
