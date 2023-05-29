import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {  Prisma } from '@prisma/client';
import * as lodash from 'lodash';
import { UserDto, UserFilterDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<UserDto> {
    return this.prisma.user.create({ data });
  }

  async find(where: UserFilterDto): Promise<UserDto[]> {
    return this.prisma.user.findMany({ where });
  }

  async update(
    where: UserFilterDto,
    data: Partial<UserDto>,
  ): Promise<Boolean> {
    await this.prisma.user.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: UserFilterDto): Promise<Boolean> {
    await this.prisma.user.deleteMany({
      where,
    });
    return true;
  }

  async count(where: UserFilterDto): Promise<number> {
    return await this.prisma.user.count({ where });
  }

  async sum(where: UserFilterDto, field): Promise<number> {
    const response = await this.prisma.user.findMany({ where });
    return lodash.sumBy(response, field);
  }
}
