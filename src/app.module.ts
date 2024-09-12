import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MovieModule } from './movie/movie.module'
import { CinemaModule } from './cinema/cinema.module'


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, MovieModule, CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
