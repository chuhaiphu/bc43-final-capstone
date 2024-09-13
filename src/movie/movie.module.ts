import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/_constants/jwt.constant'

@Module({
  imports: [ 
    PassportModule,
    JwtModule.register({}),
    CloudinaryModule
  ],
  providers: [MovieService, PrismaService],
  controllers: [MovieController]
})
export class MovieModule {}
