import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CinemaDto {
  @IsString()
  @IsNotEmpty()
  NAME: string

  @IsNumber()
  @IsNotEmpty()
  CINEMA_COMPLEX_ID: number
}
