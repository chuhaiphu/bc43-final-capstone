import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CinemaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NAME: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  CINEMA_COMPLEX_ID: number
}
