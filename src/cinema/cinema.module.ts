import { Module } from '@nestjs/common'
import { CinemaService } from './cinema.service'
import { CinemaController } from './cinema.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  providers: [CinemaService, PrismaService],
  controllers: [CinemaController]
})
export class CinemaModule {}
