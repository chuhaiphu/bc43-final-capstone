import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { SignupDto } from 'src/_dtos/signup.dto'
import { UserDto } from 'src/_dtos/user.dto'
import { AuthGuard } from '@nestjs/passport'
import { TicketDto } from 'src/_dtos/ticket.dto'
import { ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/_guards/role.guard'
import { Roles } from 'src/_guards/role.decorator'
import { ResetPasswordDto } from 'src/_dtos/reset-password.dto'

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
  @UseGuards(RolesGuard)
  @Roles(["ADMIN"])
  @Post('manager/add')
  createManager(@Body() userDto: UserDto) {
    return this.userService.createManager(userDto);
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Put('update')
  updateUser(
    @Request() req: { user: { userId: any, email: any, role: any } },
    @Body() userData: UserDto) {
    return this.userService.updateUser(req.user.userId, userData)
  }

  @ApiTags('User Main')
  @Post('forget-password')
  forgotPassword(@Query('email') email: string) {
    return this.userService.forgetPassword(email);
  }

  @ApiTags('User Main')
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const { email, verification_code, newPassword } = resetPasswordDto
    const user = await this.userService.validateVerificationToken(email, verification_code)
    return this.userService.resetPassword(user.userId, newPassword)
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["ADMIN", "MANAGER"])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["ADMIN", "MANAGER"])
  @Get('by-pagination')
  findUsersByPagination(@Query('page') page: string, @Query('limit') limit: string) {
    return this.userService.findByPagination(Number(page), Number(limit));
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Get('by-id')
  findUserById(@Query('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @ApiTags('User Main')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Roles(["ADMIN", "MANAGER", "USER"])
  @Delete('delete/:id')
  deleteUser(@Param('id') id: number, @Request() req: { user: { userId: any, email: any, role: any } }) {
    return this.userService.deleteUser(id, req.user.userId, req.user.role)
  }
  //*****************************************************

  // ! TICKET
  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["ADMIN", "MANAGER"])
  @Get('ticket')
  findAllTicket() {
    return this.userService.findAllTicket()
  }

  @ApiTags('Ticket')
  @Get('ticket/by-id')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["ADMIN", "MANAGER"])
  findTicketById(@Query('id') id: string) {
    return this.userService.findTicketById(Number(id))
  }

  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Get('ticket/by-user-id')
  findTicketByUserId(@Request() req: { user: { userId: number } }) {
    return this.userService.findTicketByUserId(req.user.userId)
  }

  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Get('ticket/by-seat-id')
  findTicketBySeatId(@Request() req: { user: { userId: number } }) {
    return this.userService.findTicketByUserId(req.user.userId)
  }

  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('ticket/add')
  createTicket(@Body() ticketData: TicketDto) {
    return this.userService.createTicket(ticketData)
  }

  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Post('ticket/book')
  bookTicket(
    @Request() req: { user: { userId: any, email: any, role: any } },
    @Query('ticketId') ticketId: string,
  ) {
    return this.userService.bookTicket(req.user.userId, Number(ticketId))
  }

  @ApiTags('Ticket')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Delete('ticket/:id')
  deleteTicket(@Param('id') id: string) {
    return this.userService.deleteTicket(Number(id))
  }
}
