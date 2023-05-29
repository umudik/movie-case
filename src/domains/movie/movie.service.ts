import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import * as lodash from 'lodash';
import { MovieDto, MovieFilterDto } from './movie.dto';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async create(data: MovieDto): Promise<MovieDto> {
    return this.movieRepository.create(data);
  }

  async find(where: MovieFilterDto): Promise<MovieDto[]> {
    return this.movieRepository.find(where);
  }

  async update(
    where: MovieFilterDto,
    data: Partial<MovieDto>,
  ): Promise<Boolean> {
    await this.movieRepository.update(where, data);
    return true
  }

  async delete(where: MovieFilterDto): Promise<void> {
    await this.movieRepository.delete(where);
  }

  async count(where: MovieFilterDto): Promise<number> {
    return this.movieRepository.count(where);
  }

  async sum(where: MovieFilterDto, field: string): Promise<number> {
    return this.movieRepository.sum(where, field);
  }
}
