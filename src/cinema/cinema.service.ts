import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CinemaDto } from 'src/_dtos/cinema.dto'
import { CinemaComplexDto } from 'src/_dtos/cinema-complex.dto'
import { CinemaChainDto } from 'src/_dtos/cinema-chain.dto'
import { SeatDto } from 'src/_dtos/seat.dto'

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  // ! CINEMA
  async findAllCinema() {
    return this.prisma.cinema.findMany({
      include: { Cinema_Complex: true }
    })
  }

  async findCinemaById(id: number) {
    return this.prisma.cinema.findUnique({
      where: { ID: id },
      include: { Cinema_Complex: true }
    })
  }

  async addCinema(cinemaData: CinemaDto) {
    const cinemaComplex = await this.prisma.cinema_Complex.findUnique({
      where: { ID: cinemaData.CINEMA_COMPLEX_ID },
    })

    if (!cinemaComplex) {
      throw new NotFoundException(`Cinema Complex with ID ${cinemaData.CINEMA_COMPLEX_ID} not found`)
    }

    return this.prisma.cinema.create({
      data: cinemaData,
    })
  }

  async updateCinema(id: number, cinemaData: CinemaDto) {
    const existingCinema = await this.prisma.cinema.findUnique({
      where: { ID: id },
    })
  
    if (!existingCinema) {
      throw new NotFoundException(`Cinema with ID ${id} not found`)
    }
  
    if (cinemaData.CINEMA_COMPLEX_ID) {
      const cinemaComplex = await this.prisma.cinema_Complex.findUnique({
        where: { ID: cinemaData.CINEMA_COMPLEX_ID },
      });
  
      if (!cinemaComplex) {
        throw new NotFoundException(`Cinema Complex with ID ${cinemaData.CINEMA_COMPLEX_ID} not found`)
      }
    }
  
    return this.prisma.cinema.update({
      where: { ID: id },
      data: cinemaData,
    })
  }
  

  async deleteCinema(id: number) {
    return this.prisma.cinema.delete({
      where: { ID: id },
    })
  }
  //******************************************************

  // ! CINEMA_COMPLEX
  async findAllCinemaComplex() {
    return this.prisma.cinema_Complex.findMany({
      include: { Cinema_Chain: true, Cinema: true }
    })
  }

  async findCinemaComplexById(id: number) {
    return this.prisma.cinema_Complex.findUnique({
      where: { ID: id },
      include: { Cinema_Chain: true, Cinema: true }
    })
  }

  async addCinemaComplex(cinemaComplexData: CinemaComplexDto) {
    const cinemaChain = await this.prisma.cinema_Chain.findUnique({
      where: { ID: cinemaComplexData.CINEMA_CHAIN_ID },
    })

    if (!cinemaChain) {
      throw new NotFoundException(`Cinema Chain with ID ${cinemaComplexData.CINEMA_CHAIN_ID} not found`)
    }

    return this.prisma.cinema_Complex.create({
      data: cinemaComplexData,
    })
  }

  async updateCinemaComplex(id: number, cinemaComplexData: CinemaComplexDto) {
    const existingCinemaComplex = await this.prisma.cinema_Complex.findUnique({
      where: { ID: id },
    })
  
    if (!existingCinemaComplex) {
      throw new NotFoundException(`Cinema Complex with ID ${id} not found`)
    }
  
    if (cinemaComplexData.CINEMA_CHAIN_ID) {
      const cinemaChain = await this.prisma.cinema_Chain.findUnique({
        where: { ID: cinemaComplexData.CINEMA_CHAIN_ID },
      })
  
      if (!cinemaChain) {
        throw new NotFoundException(`Cinema Chain with ID ${cinemaComplexData.CINEMA_CHAIN_ID} not found`);
      }
    }
  
    return this.prisma.cinema_Complex.update({
      where: { ID: id },
      data: cinemaComplexData,
    })
  }

  async deleteCinemaComplex(id: number) {
    return this.prisma.cinema_Complex.delete({
      where: { ID: id },
    })
  }
  //******************************************************

  // ! CINEMA_CHAIN
  async findAllCinemaChain() {
    return this.prisma.cinema_Chain.findMany({
      include: { Cinema_Complex: true }
    })
  }
  
  async findCinemaChainById(id: number) {
    return this.prisma.cinema_Chain.findUnique({
      where: { ID: id },
      include: { Cinema_Complex: true }
    })
  }
  
  async addCinemaChain(cinemaChainData: CinemaChainDto) {
    return this.prisma.cinema_Chain.create({
      data: cinemaChainData,
    })
  }
  
  async updateCinemaChain(id: number, cinemaChainData: CinemaChainDto) {
    return this.prisma.cinema_Chain.update({
      where: { ID: id },
      data: cinemaChainData,
    })
  }
  
  async deleteCinemaChain(id: number) {
    return this.prisma.cinema_Chain.delete({
      where: { ID: id },
    })
  }
  //******************************************************

    // ! SEAT
    async findAllSeat() {
      return this.prisma.seat.findMany({
        include: { Cinema: true }
      })
    }
  
    async findSeatById(id: number) {
      return this.prisma.seat.findUnique({
        where: { ID: id },
        include: { Cinema: true }
      })
    }
  
    async addSeat(seatData: SeatDto) {
      const cinema = await this.prisma.cinema.findUnique({
        where: { ID: seatData.CINEMA_ID },
      })

      if (!cinema) {
        throw new NotFoundException(`Cinema with ID ${seatData.CINEMA_ID} not found`)
      }

      return this.prisma.seat.create({
        data: seatData,
      })
    }
  
    async updateSeat(id: number, seatData: SeatDto) {
      const existingSeat = await this.prisma.seat.findUnique({
        where: { ID: id },
      })
    
      if (!existingSeat) {
        throw new NotFoundException(`Seat with ID ${id} not found`)
      }
    
      if (seatData.CINEMA_ID) {
        const cinema = await this.prisma.cinema.findUnique({
          where: { ID: seatData.CINEMA_ID },
        })
    
        if (!cinema) {
          throw new NotFoundException(`Cinema with ID ${seatData.CINEMA_ID} not found`)
        }
      }
    
      return this.prisma.seat.update({
        where: { ID: id },
        data: seatData,
      })
    }
  
    async deleteSeat(id: number) {
      return this.prisma.seat.delete({
        where: { ID: id },
      })
    }
}