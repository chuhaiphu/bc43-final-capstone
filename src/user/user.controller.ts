import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from 'src/_dtos/signup.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.createUser(signupDto);
  }
}
