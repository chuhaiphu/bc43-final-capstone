import { Controller, Post, UseGuards, Get, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Roles } from 'src/_guards/role.decorator'
import { RolesGuard } from 'src/_guards/role.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("credentials-strat"))
  @Post('login')
  // ! this Request is not the Request from calling api, it is the request return by credentals.strategy.ts
  login(@Request() req: {user: User}) {
    // ? req.user is from validate() in credentials.strategy.ts
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard("jwt-refresh-token-strat"))
  @Post('refresh')
  resetToken(@Request() req: {user: User}) {
    return this.authService.resetToken(req.user)
  }

  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["USER"])
  @Get('profile')
  getProfile() {
    return "authenticated";
  }
}