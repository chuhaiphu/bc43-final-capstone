import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty } from 'class-validator'

export class TicketDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  PRICE: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  USER_ID: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  MOVIE_SHOWTIME_ID: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  SEAT_ID: number
}
