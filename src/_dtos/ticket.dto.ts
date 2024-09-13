import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator'

export class TicketDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  PRICE: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  MOVIE_SHOWTIME_ID: number

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  USER_ID: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  SEAT_ID: number
}
