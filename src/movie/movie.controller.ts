import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../../src/auth/logged-in.guard';
import { RolesGuard, Roles } from '../../src/auth/role.guard';

@Controller('movie')
@UseGuards(RolesGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('create')
  async createMovie(
    @Body() data: Prisma.MovieCreateInput,
    @Req() req,
  ): Promise<Movie> {
    return this.movieService.create(data);
  }

  @UseGuards(JwtAuthGuard)
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
