import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/constants/jwt.constant';


@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, "jwt-token-strat") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username, role: payload.role }
  }
}