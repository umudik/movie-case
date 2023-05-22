// src/Movie/Movie.service.ts
import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from 'src/enitity.repository';
import * as lodash from 'lodash';

@Injectable()
export class MovieService
  implements
    Repository<
      Movie,
      Movie,
      Prisma.MovieUpdateInput,
      Prisma.MovieWhereInput
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Movie): Promise<Movie> {
    return this.prisma.movie.create({
      data,
    });
  }

  async find(where: Prisma.MovieWhereInput): Promise<Movie[]> {
    return this.prisma.movie.findMany({ where });
  }

  async update(
    where: Prisma.MovieWhereInput,
    data: Prisma.MovieUpdateInput,
  ): Promise<Boolean> {
    await this.prisma.movie.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: Prisma.MovieWhereInput): Promise<Boolean> {
    await this.prisma.movie.deleteMany({
      where,
    });
    return true;
  }

  async count(where: Prisma.MovieWhereInput): Promise<number> {
    return await this.prisma.movie.count({
      where,
    });
  }

  async sum(where: Prisma.MovieWhereInput, field): Promise<number> {
    const response = await this.prisma.movie.findMany({
      where,
    });

    return lodash.sumBy(response, field);
  }
}
