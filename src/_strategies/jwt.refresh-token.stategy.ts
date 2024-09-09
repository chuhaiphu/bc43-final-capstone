import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'src/auth/auth.service'
import { jwtConstants } from 'src/constants/jwt.constant'


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token-strat") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      //* if passReqToCallback: true, Passport.js automatically passes the request object as the first parameter to the validate method. 
      passReqToCallback: true,
    })
  }

  async validate(req: Request) {
    const user = await this.authService.validateRefreshToken(req.get('authorization'))
    return user
  }
}
