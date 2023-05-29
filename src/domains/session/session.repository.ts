// src/Session/Session.repository.ts

import { Injectable } from '@nestjs/common';
import { Session, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import * as lodash from "lodash"
import { SessionFilterDto } from './session.dto';
@Injectable()
export class SessionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Session): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  async find(where: SessionFilterDto): Promise<Session[]> {
    return this.prisma.session.findMany({ where });
  }

  async update(
    where:SessionFilterDto,
    data: Partial<Session>,
  ): Promise<Boolean> {
    await this.prisma.session.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: SessionFilterDto): Promise<Boolean> {
    await this.prisma.session.deleteMany({
      where,
    });
    return true;
  }

  async count(where: SessionFilterDto): Promise<number> {
    return this.prisma.session.count({ where });
  }

  async sum(where:SessionFilterDto, field): Promise<number> {
    const response = await this.prisma.session.findMany({ where });
    return lodash.sumBy(response, field);
  }
}
