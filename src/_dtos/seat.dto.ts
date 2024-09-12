import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class SeatDto {
  @IsNumber()
  @IsNotEmpty()
  NUMBER: number

  @IsString()
  @IsNotEmpty()
  NAME: string

  @IsNumber()
  @IsNotEmpty()
  CINEMA_ID: number
}
