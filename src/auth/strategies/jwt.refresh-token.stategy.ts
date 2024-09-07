import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/constants/jwt.constant';
import { AuthService } from '../auth.service';

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

  async validate(req: any) {
    const user = await this.authService.validateRefreshToken(req.get('authorization'))
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user
  }
}
