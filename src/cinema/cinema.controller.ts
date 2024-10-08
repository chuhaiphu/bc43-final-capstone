import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaDto } from 'src/_dtos/cinema.dto';
import { CinemaComplexDto } from 'src/_dtos/cinema-complex.dto';
import { CinemaChainDto } from 'src/_dtos/cinema-chain.dto';
import { SeatDto } from 'src/_dtos/seat.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/_guards/role.guard';
import { Roles } from 'src/_guards/role.decorator';

@Controller('cinema')

export class CinemaController {
  constructor(private cinemaService: CinemaService) { }

  // ! CINEMA
  @ApiTags('Cinema Main')
  @Get()
  findAllCinema() {
    return this.cinemaService.findAllCinema()
  }

  @ApiTags('Cinema Main')
  @Get('by-id')
  findCinemaById(@Query('id') id: string) {
    return this.cinemaService.findCinemaById(Number(id))
  }

  @ApiTags('Cinema Main')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Post('add')
  addCinema(@Body() cinemaData: CinemaDto) {
    return this.cinemaService.addCinema(cinemaData)
  }

  @ApiTags('Cinema Main')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Put('update/:id')
  updateCinema(@Param('id') id: string, @Body() cinemaData: CinemaDto) {
    return this.cinemaService.updateCinema(Number(id), cinemaData)
  }

  @ApiTags('Cinema Main')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('delete/:id')
  deleteCinema(@Param('id') id: string) {
    return this.cinemaService.deleteCinema(Number(id))
  }

  // ! CINEMA COMPLEX
  @ApiTags('Cinema Complex')
  @Get('cinema-complex')
  findAllCinemaComplex() {
    return this.cinemaService.findAllCinemaComplex()
  }

  @ApiTags('Cinema Complex')
  @Get('cinema-complex/by-id')
  findCinemaComplexById(@Query('id') id: string) {
    return this.cinemaService.findCinemaComplexById(Number(id))
  }

  @ApiTags('Cinema Complex')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Post('cinema-complex/add')
  addCinemaComplex(@Body() cinemaComplexData: CinemaComplexDto) {
    return this.cinemaService.addCinemaComplex(cinemaComplexData)
  }

  @ApiTags('Cinema Complex')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Put('cinema-complex/update/:id')
  updateCinemaComplex(@Param('id') id: string, @Body() cinemaComplexData: CinemaComplexDto) {
    return this.cinemaService.updateCinemaComplex(Number(id), cinemaComplexData)
  }

  @ApiTags('Cinema Complex')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('cinema-complex/delete/:id')
  deleteCinemaComplex(@Param('id') id: string) {
    return this.cinemaService.deleteCinemaComplex(Number(id))
  }

  // ! CINEMA CHAIN
  @ApiTags('Cinema Chain')
  @Get('cinema-chain')
  findAllCinemaChain() {
    return this.cinemaService.findAllCinemaChain()
  }

  @ApiTags('Cinema Chain')
  @Get('cinema-chain/by-id')
  findCinemaChainById(@Query('id') id: string) {
    return this.cinemaService.findCinemaChainById(Number(id))
  }

  @ApiTags('Cinema Chain')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Post('cinema-chain/add')
  addCinemaChain(@Body() cinemaChainData: CinemaChainDto) {
    return this.cinemaService.addCinemaChain(cinemaChainData)
  }

  @ApiTags('Cinema Chain')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Put('cinema-chain/update/:id')
  updateCinemaChain(@Param('id') id: string, @Body() cinemaChainData: CinemaChainDto) {
    return this.cinemaService.updateCinemaChain(Number(id), cinemaChainData)
  }

  @ApiTags('Cinema Chain')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('cinema-chain/delete/:id')
  deleteCinemaChain(@Param('id') id: string) {
    return this.cinemaService.deleteCinemaChain(Number(id))
  }
  //***************************************************************

  // ! SEAT
  @ApiTags('Seat')
  @Get('seat')
  findAllSeat() {
    return this.cinemaService.findAllSeat()
  }

  @ApiTags('Seat')
  @Get('seat/by-id')
  findSeatById(@Query('id') id: string) {
    return this.cinemaService.findSeatById(Number(id))
  }

  @ApiTags('Seat')
  @Post('seat/add')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  addSeat(@Body() seatData: SeatDto) {
    return this.cinemaService.addSeat(seatData)
  }

  @ApiTags('Seat')
  @Put('seat/update/:id')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  updateSeat(@Param('id') id: string, @Body() seatData: SeatDto) {
    return this.cinemaService.updateSeat(Number(id), seatData)
  }

  @ApiTags('Seat')
  @Delete('seat/delete/:id')
  @UseGuards(AuthGuard("jwt-token-strat"), RolesGuard)
  @Roles(["MANAGER"])
  deleteSeat(@Param('id') id: string) {
    return this.cinemaService.deleteSeat(Number(id))
  }
}
