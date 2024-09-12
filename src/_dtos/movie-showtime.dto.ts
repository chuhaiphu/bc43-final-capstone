import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class MovieShowtimeDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  SHOWTIME: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  MOVIE_ID: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  CINEMA_ID: number
}