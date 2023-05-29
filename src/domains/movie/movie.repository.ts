import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as lodash from 'lodash';
import { MovieDto, MovieFilterDto } from './movie.dto';

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: MovieDto): Promise<MovieDto> {
    return this.prisma.movie.create({
      data,
    });
  }

  async find(where: MovieFilterDto): Promise<MovieDto[]> {
    return this.prisma.movie.findMany({ where });
  }

  async update(
    where: MovieFilterDto,
    data: Partial<MovieDto>,
  ): Promise<void> {
    await this.prisma.movie.updateMany({
      where,
      data,
    });
  }

  async delete(where: MovieFilterDto): Promise<void> {
    await this.prisma.movie.deleteMany({
      where,
    });
  }

  async count(where: MovieFilterDto): Promise<number> {
    return await this.prisma.movie.count({
      where,
    });
  }

  async sum(where: MovieFilterDto, field): Promise<number> {
    const response = await this.prisma.movie.findMany({
      where,
    });

    return lodash.sumBy(response, field);
  }
}
