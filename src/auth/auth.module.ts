import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'prisma/prisma.service'
import { jwtConstants } from 'src/_constants/jwt.constant'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CredentialsStrategy } from 'src/_strategies/credentials.strategy'
import { JwtTokenStrategy } from 'src/_strategies/jwt.access-token.strategy'
import { JwtRefreshTokenStrategy } from 'src/_strategies/jwt.refresh-token.stategy'


@Module({
  imports: [
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret}),
  ],
  providers: [AuthService, CredentialsStrategy, JwtTokenStrategy, JwtRefreshTokenStrategy, PrismaService],
  controllers: [AuthController]
})
export class AuthModule { }

