import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';

@Controller('Movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createMovie(@Body() data: Prisma.MovieCreateInput): Promise<Movie> {
    return this.movieService.create(data);
  }

  @Post('find')
  async findAllMovies(
    @Body() where: Prisma.MovieWhereUniqueInput,
  ): Promise<Movie[]> {
    return this.movieService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
    @Body() data: Prisma.MovieUpdateInput,
  ): Promise<Boolean> {
    return await this.movieService.update(where, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
  ): Promise<Boolean> {
    return this.movieService.delete(where);
  }
}
