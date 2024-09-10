import { IsEmail, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsEnum(['USER', 'MANAGER', 'ADMIN'])
  role: string
}
