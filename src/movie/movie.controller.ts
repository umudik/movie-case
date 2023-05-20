import { Controller, Post, Body } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import { MovieService } from './movie.service';

@Controller('Movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

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

  @Post('update')
  async updateMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
    @Body() data: Prisma.MovieUpdateInput,
  ): Promise<Boolean> {
    return await this.movieService.update(where, data);
  }

  @Post('delete')
  async deleteMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
  ): Promise<Boolean> {
    return this.movieService.delete(where);
  }
}
