import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MovieDto } from 'src/_dtos/movie.dto';
import { MovieService } from './movie.service';
import { PaginationDto } from 'src/_dtos/pagination.dto';

@Controller('movie')
export class MovieController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private movieService: MovieService
  ) { }

  // ! MOVIE MAIN
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('movie-image'))
  uploadMovieImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('filename') filename?: string
  ) {
    return this.cloudinaryService.uploadFile(file, 'final-capstone/movie-images', filename)
  }

  @Post('upload-banner')
  @UseInterceptors(FileInterceptor('movie-banner'))
  uploadMovieBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body('filename') filename?: string
  ) {
    return this.cloudinaryService.uploadFile(file, 'final-capstone/movie-banners', filename)
  }

  @Delete('delete-image')
  deleteImage(@Query('publicId') publicId: string) {
    return this.cloudinaryService.deleteFile(publicId)
  }

  @Post('add')
  addMovie(@Body() movieData: MovieDto) {
    return this.movieService.addMovie(movieData)
  }

  @Put('update/:id')
  updateMovie(@Param('id') id: string, @Body() updateMovieDto: MovieDto) {
    return this.movieService.updateMovie(Number(id), updateMovieDto)
  }

  @Delete('delete/:id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(Number(id))
  }

  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @Get('by-id')
  findById(@Query('id') id: number) {
    return this.movieService.findById(id)
  }

  @Get('by-pagination')
  findByPagination(@Query() paginationDto: PaginationDto) {
    return this.movieService.findByPagination(paginationDto.page, paginationDto.limit)
  }

  @Get('by-release-date')
  findByReleaseDate(@Query('date') date: string) {
    const releaseDate = new Date(date)
    return this.movieService.findByReleaseDate(releaseDate)
  }
  // ************************

  // ! MOVIE BANNER
  @Get('banner/by-movie-id')
  findMovieBanner(@Query('movie_id') movie_id: number) {
    return this.movieService.findMovieBanner(movie_id)
  }

  @Post('banner/add')
  addMovieBanner(
    @Body('movie_id') movie_id: number,
    @Body('image') image: string
  ) {
    return this.movieService.addMovieBanner(movie_id, image)
  }

  @Delete('banner/delete/:id')
  deleteMovieBanner(@Param('id') id: number) {
    return this.movieService.deleteMovieBanner(id)
  }
  // ************************

  // ! MOVIE REVIEW
  @Get('review')
  findAllReviews() {
    return this.movieService.findAllReviews()
  }

  @Get('review/by-pagination')
  findReviews(
    @Query('movieId') movieId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.movieService.findReviewByPagination(Number(movieId), paginationDto.page, paginationDto.limit)
  }

  @Post('review/add')
  addReview(
    @Body('movieId') movieId: number,
    @Body('content') content: string,
    @Body('ratings') ratings: number
  ) {
    return this.movieService.addReview(movieId, content, ratings)
  }

  @Put('review/update/:id')
  updateReview(
    @Param('id') id: number,
    @Body('content') content: string,
    @Body('ratings') ratings: number
  ) {
    return this.movieService.updateReview(Number(id), content, ratings)
  }

  @Delete('review/delete/:id')
  deleteReview(@Param('id') id: number) {
    return this.movieService.deleteReview(Number(id))
  }
  
}
