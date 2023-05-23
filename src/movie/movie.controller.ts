import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';
import { RolesGuard, Roles } from 'src/auth/role.guard';
import { MovieDto } from 'src/dtos/movie.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('movie')
@UseGuards(RolesGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('create')
  @ApiResponse({
    type: MovieDto
  })
  async createMovie(@Body() data: MovieDto) {
    return this.movieService.create(data);
  }

  @Post('find')
  @ApiResponse({
    type: MovieDto,
    isArray:true
  })
  async findAllMovies(
    @Body() where: Prisma.MovieWhereUniqueInput,
  ): Promise<Movie[]> {
    return this.movieService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('update')
  @ApiResponse({
    type: Boolean
  })
  async updateMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
    @Body() data: Prisma.MovieUpdateInput,
  ): Promise<Boolean> {
    return await this.movieService.update(where, data);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteMovie(
    @Body() where: Prisma.MovieWhereUniqueInput,
  ): Promise<Boolean> {
    return this.movieService.delete(where);
  }
}

