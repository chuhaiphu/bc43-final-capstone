import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaDto } from 'src/_dtos/cinema.dto';
import { CinemaComplexDto } from 'src/_dtos/cinema-complex.dto';
import { CinemaChainDto } from 'src/_dtos/cinema-chain.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private cinemaService: CinemaService) { }

  // ! CINEMA
  @Get()
  findAllCinema() {
    return this.cinemaService.findAllCinema()
  }

  @Get('by-id')
  findCinemaById(@Query('id') id: string) {
    return this.cinemaService.findCinemaById(Number(id))
  }

  @Post('add')
  addCinema(@Body() cinemaData: CinemaDto) {
    return this.cinemaService.addCinema(cinemaData)
  }

  @Put('update/:id')
  updateCinema(@Param('id') id: string, @Body() cinemaData: CinemaDto) {
    return this.cinemaService.updateCinema(Number(id), cinemaData)
  }

  @Delete('delete/:id')
  deleteCinema(@Param('id') id: string) {
    return this.cinemaService.deleteCinema(Number(id))
  }

  // ! CINEMA COMPLEX
  @Get('cinema-complex')
  findAllCinemaComplex() {
    return this.cinemaService.findAllCinemaComplex()
  }

  @Get('cinema-complex/by-id')
  findCinemaComplexById(@Query('id') id: string) {
    return this.cinemaService.findCinemaComplexById(Number(id))
  }

  @Post('cinema-complex/add')
  addCinemaComplex(@Body() cinemaComplexData: CinemaComplexDto) {
    return this.cinemaService.addCinemaComplex(cinemaComplexData)
  }

  @Put('cinema-complex/update/:id')
  updateCinemaComplex(@Param('id') id: string, @Body() cinemaComplexData: CinemaComplexDto) {
    return this.cinemaService.updateCinemaComplex(Number(id), cinemaComplexData)
  }

  @Delete('cinema-complex/delete/:id')
  deleteCinemaComplex(@Param('id') id: string) {
    return this.cinemaService.deleteCinemaComplex(Number(id))
  }

  // ! CINEMA CHAIN
  @Get('cinema-chain')
  findAllCinemaChain() {
    return this.cinemaService.findAllCinemaChain()
  }

  @Get('cinema-chain/by-id')
  findCinemaChainById(@Query('id') id: string) {
    return this.cinemaService.findCinemaChainById(Number(id))
  }

  @Post('cinema-chain/add')
  addCinemaChain(@Body() cinemaChainData: CinemaChainDto) {
    return this.cinemaService.addCinemaChain(cinemaChainData)
  }

  @Put('cinema-chain/update/:id')
  updateCinemaChain(@Param('id') id: string, @Body() cinemaChainData: CinemaChainDto) {
    return this.cinemaService.updateCinemaChain(Number(id), cinemaChainData)
  }

  @Delete('cinema-chain/delete/:id')
  deleteCinemaChain(@Param('id') id: string) {
    return this.cinemaService.deleteCinemaChain(Number(id))
  }
}
