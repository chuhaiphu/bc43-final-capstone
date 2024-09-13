import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class MovieShowtimeDto {
  @ApiProperty({ 
    description: 'YYYY-MM-DDTHH:mm:ssZ',
    example: '2024-01-01T23:59:00Z'
  })
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