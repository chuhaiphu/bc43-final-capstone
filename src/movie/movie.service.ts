import { Injectable } from '@nestjs/common'
import { IsNumber } from 'class-validator'
import { PrismaService } from 'prisma/prisma.service'
import { MovieDto } from 'src/_dtos/movie.dto'

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
    
  // ! MOVIE MAIN
  async findAll() {
    return this.prisma.movie.findMany({
      orderBy: {
        ID: 'asc',
      },
    })
  }

  async findByPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    //* Not using Promise.all
    // const movies = await this.prisma.movie.findMany({
    //   skip,
    //   take: limit,
    //   orderBy: {
    //     ID: 'asc',
    //   },
    // })
    // const total = await this.prisma.movie.count()

    // Using Promise.all
    //? A Promise is an object representing the eventual completion or failure of an asynchronous operation
    //? Promise.all is used to execute two asynchronous operations concurrently:
    //* When both Promises resolve, the results are destructured into the movies and total
    const [movies, total] = await Promise.all([
      //* Promise 1: Fetching a page of movies using prisma.movie.findMany()
      this.prisma.movie.findMany({
        skip,
        take: limit,
        orderBy: {
          ID: 'asc',
        },
      }),
      //* Promise 2: Counting the total number of movies using prisma.movie.count()
      this.prisma.movie.count(),
    ])

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      movies
    }
  }

  async findById(id: number) {
    return await this.prisma.movie.findUnique({
      where: {
        ID: id,
      },
    })
  }

  async findByReleaseDate(releaseDate: Date) {
    return await this.prisma.movie.findMany({
      where: {
        RELEASE_DATE: releaseDate
      },
      orderBy: {
        NAME: 'asc'
      }
    })
  }
  
  async addMovie(movieData: MovieDto) {
    return await this.prisma.movie.create({
      data: movieData,
    })
  }
  
  async updateMovie(id: number, movieData: MovieDto) {
    return await this.prisma.movie.update({
      where: {
        ID: id,
      },
      data: movieData,
    })
  }

  async deleteMovie(id: number) {
    return await this.prisma.movie.delete({
      where: {
        ID: id,
      },
    })
  }
  // ************************

  // ! MOVIE BANNER
  async findMovieBanner(movie_id: number) {
    return await this.prisma.banner.findMany({
      where: {
        MOVIE_ID: movie_id
      },
      orderBy: {
        ID: 'asc'
      }
    })
  }

  async addMovieBanner(movie_id: number, image: string) {
    return await this.prisma.banner.create({
      data: {
        MOVIE_ID: movie_id,
        IMAGE: image
      }
    })
  }
  
  async deleteMovieBanner(id: number) {
    return await this.prisma.banner.delete({
      where: {
        ID: id
      }
    })
  }
  // ************************

  // ! MOVIE REVIEW
  async findAllReviews() {
    return this.prisma.review.findMany({
      orderBy: {
        ID: 'asc',
      },
    })
  }
  
  async findReviewByPagination(movieId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: {
          MOVIE_ID: movieId
        },
        skip,
        take: limit,
        orderBy: {
          ID: 'desc',
        },
      }),
      this.prisma.review.count({
        where: {
          MOVIE_ID: movieId
        }
      }),
    ])

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      reviews
    }
  }

  async addReview(movieId: number, content: string, ratings: number) {
    return await this.prisma.review.create({
      data: {
        MOVIE_ID: movieId,
        CONTENT: content,
        RATINGS: ratings
      }
    })
  }

  async updateReview(id: number, content: string, ratings: number) {
    return await this.prisma.review.update({
      where: {
        ID: id,
      },
      data: {
        CONTENT: content,
        RATINGS: ratings
      },
    })
  }

  async deleteReview(id: number) {
    return await this.prisma.review.delete({
      where: {
        ID: id,
      },
    })
  }
}
