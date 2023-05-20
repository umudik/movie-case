// src/Session/Session.service.ts
import { Injectable } from '@nestjs/common';
import { Session, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from 'src/enitity.repository';
import * as lodash from 'lodash';
import { TicketService } from '../../src/ticket/ticket.service';

@Injectable()
export class SessionService
  implements
    Repository<
      Session,
      Session,
      Prisma.SessionUpdateInput,
      Prisma.SessionWhereInput
    >
{
  constructor(
    private prisma: PrismaService,
    private ticketService: TicketService,
  ) {}

  async create(data: Session): Promise<Session> {
    const session = await this.prisma.session.create({
      data,
    });

    return session;
  }

  async find(where: Prisma.SessionWhereInput): Promise<Session[]> {
    return await this.prisma.session.findMany({ where });
  }

  async update(
    where: Prisma.SessionWhereInput,
    data: Prisma.SessionUpdateInput,
  ): Promise<Boolean> {
    await this.prisma.session.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: Prisma.SessionWhereInput): Promise<Boolean> {
    await this.prisma.session.deleteMany({
      where,
    });
    return true;
  }

  async count(where: Prisma.SessionWhereInput): Promise<number> {
    return await this.prisma.session.count({
      where,
    });
  }

  async sum(where: Prisma.SessionWhereInput, field): Promise<number> {
    const response = await this.prisma.session.findMany({
      where,
    });

    return lodash.sumBy(response, field);
  }
}