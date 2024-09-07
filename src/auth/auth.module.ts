import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CredentialsStrategy } from './strategies/credentials.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { JwtTokenStrategy } from './strategies/jwt.token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh-token.stategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret}),
  ],
  providers: [AuthService, CredentialsStrategy, JwtTokenStrategy, JwtRefreshTokenStrategy, PrismaService],
  controllers: [AuthController]
})
export class AuthModule { }

