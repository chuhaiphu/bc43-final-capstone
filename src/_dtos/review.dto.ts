import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class ReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CONTENT: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  RATINGS: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  MOVIE_ID: number
}
