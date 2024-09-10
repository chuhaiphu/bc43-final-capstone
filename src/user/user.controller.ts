import { Body, Controller, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from 'src/_dtos/signup.dto';
import { UserDto } from 'src/_dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.createUser(signupDto);
  }

  @UseGuards(AuthGuard('jwt-token-strat'))
  @Put('update')
  updateUser(
    @Request() req: {user: {userId: any, email: any, role: any}}, 
    @Body() userData: UserDto) {
    return this.userService.updateUser(req.user.userId, userData);
  }

  @Post('forget-password')
  forgotPassword(@Query('email') email: string) {
    return this.userService.forgetPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('verification_code') verification_code: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.userService.validateVerificationToken(email, verification_code)
    return this.userService.resetPassword(user.userId, newPassword)
  }
}
