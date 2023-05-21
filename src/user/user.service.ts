// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from '../../src/enitity.repository';
import * as lodash from 'lodash';

@Injectable()
export class UserService
  implements
    Repository<
      User,
      Prisma.UserCreateInput,
      Prisma.UserUpdateInput,
      Prisma.UserWhereInput
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async find(where: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({ where });
  }

  async update(
    where: Prisma.UserWhereInput,
    data: Prisma.UserUpdateInput,
  ): Promise<Boolean> {
    await this.prisma.user.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: Prisma.UserWhereInput): Promise<Boolean> {
    await this.prisma.user.deleteMany({
      where,
    });
    return true;
  }

  async count(where: Prisma.UserWhereInput): Promise<number> {
    return await this.prisma.user.count({
      where,
    });
  }

  async sum(where: Prisma.UserWhereInput, field): Promise<number> {
    const response = await this.prisma.user.findMany({
      where,
    });

    return lodash.sumBy(response, field);
  }
}
