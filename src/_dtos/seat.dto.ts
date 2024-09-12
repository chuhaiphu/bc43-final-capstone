import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class SeatDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  NUMBER: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NAME: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  CINEMA_ID: number
}
