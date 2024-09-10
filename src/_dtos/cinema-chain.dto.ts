import { IsString, IsNotEmpty } from 'class-validator'

export class CinemaChainDto {
  @IsString()
  @IsNotEmpty()
  NAME: string

  @IsString()
  @IsNotEmpty()
  LOGO: string
}
