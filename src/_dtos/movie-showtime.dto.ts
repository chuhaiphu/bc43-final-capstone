import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class MovieShowtimeDto {
  @IsString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  SHOWTIME: string

  @IsNumber()
  @IsNotEmpty()
  MOVIE_ID: number

  @IsNumber()
  @IsNotEmpty()
  CINEMA_ID: number
}