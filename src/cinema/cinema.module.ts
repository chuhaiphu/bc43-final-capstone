import { Module } from '@nestjs/common'
import { CinemaService } from './cinema.service'
import { CinemaController } from './cinema.controller'
import { PrismaService } from '../prisma/prisma.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/_constants/jwt.constant'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({})
  ],
  providers: [CinemaService, PrismaService],
  controllers: [CinemaController]
})
export class CinemaModule { }
