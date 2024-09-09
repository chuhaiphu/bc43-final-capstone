import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator'

export class SignupDto {
  @IsString()
  fullname: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsEnum(['USER', 'MANAGER', 'ADMIN'])
  role: string
}
