import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from './../../prisma/prisma.service'
import { LoginDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { jwtConstants } from 'src/constants/jwt.constant'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async validateUser(loginData: LoginDto) {
    const { email, password } = loginData
    const user = await this.prisma.user.findFirst({
      where: { EMAIL: email },
    })

    const isPasswordMatch = await bcrypt.compare(password, user.PASSWORD)
    if (isPasswordMatch) {
      // ? collect all properties of user except password to new [result] variable
      const { PASSWORD, ...result } = user
      return result
    }
    return null
  }

  async validateRefreshToken(input_refresh_token: string) {
    const token = input_refresh_token.split(' ')[1];
    const user = await this.prisma.user.findFirst({
      where: { REFRESH_TOKEN: token },
    })

    if (user) {
      const { PASSWORD, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { email: user.EMAIL, sub: user.ID };
    const access_token = this.jwtService.sign(payload, { expiresIn: '10s' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '1w' });

    // Save refresh token to the database
    await this.prisma.user.update({
      where: { ID: user.ID },
      data: { REFRESH_TOKEN: refresh_token },
    })

    return {
      access_token,
      refresh_token,
    }
  }

  async resetToken(user: User) {
    const payload = { email: user.EMAIL, sub: user.ID };
    const access_token = this.jwtService.sign(payload, { expiresIn: '10s' });
    return {
      access_token
    }
  }

}
