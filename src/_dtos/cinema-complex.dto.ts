import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CinemaComplexDto {
  @IsString()
  @IsNotEmpty()
  NAME: string

  @IsString()
  @IsNotEmpty()
  ADDRESS: string

  @IsNumber()
  @IsNotEmpty()
  CINEMA_CHAIN_ID: number
}
