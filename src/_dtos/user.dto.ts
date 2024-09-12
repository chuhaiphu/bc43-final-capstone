import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator'

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  FULLNAME?: string

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  EMAIL?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  PASSWORD?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  PHONE?: string

  @IsEnum(['USER', 'MANAGER', 'ADMIN'])
  @IsOptional()
  @IsNotEmpty()
  ROLE?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  VERIFICATION_TOKEN?: string
}
