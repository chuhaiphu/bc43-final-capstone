import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MovieDto } from 'src/_dtos/movie.dto';
import { MovieService } from './movie.service';
import { PaginationDto } from 'src/_dtos/pagination.dto';
import { MovieShowtimeDto } from 'src/_dtos/movie-showtime.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/_guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/_guards/role.decorator';

@Controller('movie')
export class MovieController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private movieService: MovieService
  ) { }

  // ! MOVIE MAIN
  @ApiTags('Movie Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('movie-image'))
  uploadMovieImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('filename') filename?: string
  ) {
    return this.cloudinaryService.uploadFile(file, 'final-capstone/movie-images', filename)
  }

  @ApiTags('Movie Banner')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('upload-banner')
  @UseInterceptors(FileInterceptor('movie-banner'))
  uploadMovieBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body('filename') filename?: string
  ) {
    return this.cloudinaryService.uploadFile(file, 'final-capstone/movie-banners', filename)
  }

  @ApiTags('Movie Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('delete-image')
  deleteImage(@Query('publicId') publicId: string) {
    return this.cloudinaryService.deleteFile(publicId)
  }

  @ApiTags('Movie Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('add')
  addMovie(@Body() movieData: MovieDto) {
    return this.movieService.addMovie(movieData)
  }

  @ApiTags('Movie Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Put('update/:id')
  updateMovie(@Param('id') id: string, @Body() updateMovieDto: MovieDto) {
    return this.movieService.updateMovie(Number(id), updateMovieDto)
  }

  @ApiTags('Movie Main')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('delete/:id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(Number(id))
  }

  @ApiTags('Movie Main')
  @Get()
  findAll() {
    return this.movieService.findAll()
  }

  @ApiTags('Movie Main')
  @Get('by-id')
  findById(@Query('id') id: number) {
    return this.movieService.findById(id)
  }

  @ApiTags('Movie Main')
  @Get('by-pagination')
  findByPagination(@Query() paginationDto: PaginationDto) {
    return this.movieService.findByPagination(paginationDto.page, paginationDto.limit)
  }

  @ApiTags('Movie Main')
  @Get('by-release-date')
  findByReleaseDate(@Query('date') date: string) {
    const releaseDate = new Date(date)
    return this.movieService.findByReleaseDate(releaseDate)
  }
  // ************************

  // ! MOVIE BANNER
  @ApiTags('Movie Banner')
  @Get('banner/by-movie-id')
  findMovieBanner(@Query('movie_id') movie_id: number) {
    return this.movieService.findMovieBanner(movie_id)
  }

  @ApiTags('Movie Banner')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('banner/add')
  addMovieBanner(
    @Body('movie_id') movie_id: number,
    @Body('image') image: string
  ) {
    return this.movieService.addMovieBanner(movie_id, image)
  }
  
  @ApiTags('Movie Banner')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('banner/delete/:id')
  deleteMovieBanner(@Param('id') id: number) {
    return this.movieService.deleteMovieBanner(id)
  }
  // ************************

  // ! MOVIE REVIEW
  @ApiTags('Movie Review')
  @Get('review')
  findAllReviews() {
    return this.movieService.findAllReviews()
  }

  @ApiTags('Movie Review')
  @Get('review/by-pagination')
  findReviewByPagination(
    @Query('movieId') movieId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.movieService.findReviewByPagination(Number(movieId), paginationDto.page, paginationDto.limit)
  }

  @ApiTags('Movie Review')
  @UseGuards(AuthGuard('jwt-token-strat'))
  @Post('review/add')
  addReview(
    @Body('movieId') movieId: number,
    @Body('content') content: string,
    @Body('ratings') ratings: number
  ) {
    return this.movieService.addReview(movieId, content, ratings)
  }

  @ApiTags('Movie Review')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Put('review/update/:id')
  updateReview(
    @Param('id') id: number,
    @Body('content') content: string,
    @Body('ratings') ratings: number
  ) {
    return this.movieService.updateReview(Number(id), content, ratings)
  }

  @ApiTags('Movie Review')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('review/delete/:id')
  deleteReview(@Param('id') id: number) {
    return this.movieService.deleteReview(Number(id))
  }
  // ************************

  // ! MOVIE SHOWTIME
  @ApiTags('Movie Showtime')
  @Get('movie-showtime')
  findAllMovieShowtime() {
    return this.movieService.findAllMovieShowtime()
  }

  @ApiTags('Movie Showtime')
  @Get('movie-showtime/by-id')
  findMovieShowtimeById(@Query('id') id: string) {
    return this.movieService.findMovieShowtimeById(Number(id))
  }

  @ApiTags('Movie Showtime')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Post('movie-showtime/add')
  addMovieShowtime(@Body() movieShowtimeData: MovieShowtimeDto) {
    return this.movieService.addMovieShowtime(movieShowtimeData)
  }

  @ApiTags('Movie Showtime')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Put('movie-showtime/:id')
  updateMovieShowtime(@Param('id') id: string, @Body() movieShowtimeData: MovieShowtimeDto) {
    return this.movieService.updateMovieShowtime(Number(id), movieShowtimeData)
  }

  @ApiTags('Movie Showtime')
  @UseGuards(AuthGuard('jwt-token-strat'), RolesGuard)
  @Roles(["MANAGER"])
  @Delete('movie-showtime/:id')
  deleteMovieShowtime(@Param('id') id: string) {
    return this.movieService.deleteMovieShowtime(Number(id))
  }

}
