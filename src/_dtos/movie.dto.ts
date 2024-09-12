import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty } from 'class-validator'


export class MovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  NAME: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  TRAILER?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  IMAGE?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  DESCRIPTION?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  RELEASE_DATE?: string

  @ApiProperty()
  @IsBoolean()
  IS_HOT: boolean

  @ApiProperty()
  @IsBoolean()
  IS_SHOWING: boolean

  @ApiProperty()
  @IsBoolean()
  IS_COMING: boolean
}
