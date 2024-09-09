import { IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsNumber()
  @Min(1)
  page: number

  @IsNumber()
  @Min(1)
  limit: number
}
