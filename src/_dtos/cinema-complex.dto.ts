import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CinemaComplexDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NAME: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ADDRESS: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  CINEMA_CHAIN_ID: number
}
