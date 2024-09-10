import { Transform } from 'class-transformer'
import { IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';


export class MovieDto {
  @IsString()
  @IsNotEmpty()
  NAME: string

  @IsString()
  @IsOptional()
  TRAILER?: string

  @IsString()
  @IsOptional()
  IMAGE?: string

  @IsString()
  @IsOptional()
  DESCRIPTION?: string

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  RELEASE_DATE?: string

  @IsBoolean()
  IS_HOT: boolean

  @IsBoolean()
  IS_SHOWING: boolean

  @IsBoolean()
  IS_COMING: boolean
}
