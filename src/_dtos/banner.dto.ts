import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class BannerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  IMAGE: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  MOVIE_ID: number
}
