import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from 'src/_dtos/signup.dto';
import { UserDto } from 'src/_dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TicketDto } from 'src/_dtos/ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  // ! USER MAIN
  @ApiTags('User Main')
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.userService.createUser(signupDto);
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Put('update')
  updateUser(
    @Request() req: { user: { userId: any, email: any, role: any } },
    @Body() userData: UserDto) {
    return this.userService.updateUser(req.user.userId, userData);
  }

  @ApiTags('User Main')
  @Post('forget-password')
  forgotPassword(@Query('email') email: string) {
    return this.userService.forgetPassword(email);
  }

  @ApiTags('User Main')
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('verification_code') verification_code: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.userService.validateVerificationToken(email, verification_code)
    return this.userService.resetPassword(user.userId, newPassword)
  }

  @ApiTags('User Main')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('User Main')
  @Get('by-pagination')
  findUsersByPagination(@Query('page') page: string, @Query('limit') limit: string) {
    return this.userService.findByPagination(Number(page), Number(limit));
  }

  @ApiTags('User Main')
  @Get('by-id')
  findUserById(@Query('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @ApiTags('User Main')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  //*****************************************************

  // ! TICKET
  @ApiTags('Ticket')
  @Get('ticket')
  findAllTicket() {
    return this.userService.findAllTicket()
  }

  @ApiTags('Ticket')
  @Get('ticket/by-id')
  findTicketById(@Query('id') id: string) {
    return this.userService.findTicketById(Number(id))
  }

  @ApiTags('Ticket')
  @Post('ticket/add')
  createTicket(@Body() ticketData: TicketDto) {
    return this.userService.createTicket(ticketData)
  }

  @ApiTags('Ticket')
  @Put('ticket/:id')
  updateTicket(@Param('id') id: string, @Body() ticketData: TicketDto) {
    return this.userService.updateTicket(Number(id), ticketData)
  }

  @ApiTags('Ticket')
  @Delete('ticket/:id')
  deleteTicket(@Param('id') id: string) {
    return this.userService.deleteTicket(Number(id))
  }
}
