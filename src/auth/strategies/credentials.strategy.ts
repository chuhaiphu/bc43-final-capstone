import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dtos/login.dto';


@Injectable()
export class CredentialsStrategy extends PassportStrategy(Strategy, "credentials-strat") {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginData: LoginDto = { email, password };
    const user = await this.authService.validateUser(loginData);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}