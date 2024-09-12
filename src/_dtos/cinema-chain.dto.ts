import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CinemaChainDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NAME: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  LOGO: string
}
