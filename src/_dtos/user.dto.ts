import { IsEmail, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsString()
  @IsOptional()
  FULLNAME?: string

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  EMAIL?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  PASSWORD?: string

  @IsString()
  @IsOptional()
  PHONE?: string

  @IsEnum(['USER', 'MANAGER', 'ADMIN'])
  @IsOptional()
  @IsNotEmpty()
  ROLE?: string

  @IsString()
  @IsOptional()
  VERIFICATION_TOKEN?: string
}
