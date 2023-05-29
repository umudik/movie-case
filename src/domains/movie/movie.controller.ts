import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Prisma, Movie } from '@prisma/client';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/infrastructure/security/logged-in.guard';
import { RolesGuard, Roles } from 'src/infrastructure/security/role.guard';
import { MovieDto, MovieFilterDto, MovieUpdateDto } from 'src/domains/movie/movie.dto';
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
    @Body() where:MovieFilterDto,
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
    @Body() update: MovieUpdateDto,
  ): Promise<Boolean> {
    await this.movieService.update(update.where, update.data);
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteMovie(
    @Body() where: MovieFilterDto,
  ): Promise<Boolean> {
    await this.movieService.delete(where);
    return true
  }
}

