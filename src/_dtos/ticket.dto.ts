import { IsNumber, IsNotEmpty } from 'class-validator'

export class TicketDto {
  @IsNumber()
  @IsNotEmpty()
  PRICE: number

  @IsNumber()
  @IsNotEmpty()
  USER_ID: number

  @IsNumber()
  @IsNotEmpty()
  MOVIE_SHOWTIME_ID: number
}
