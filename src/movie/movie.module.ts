import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { PrismaService } from 'prisma/prisma.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [CloudinaryModule],
  providers: [MovieService, PrismaService],
  controllers: [MovieController]
})
export class MovieModule {}
