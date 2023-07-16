import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { passwordRegex } from '@/helpers/regexes/password';

export class AuthUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(passwordRegex, {
    message:
      'Password must be at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  readonly password: string;
}
