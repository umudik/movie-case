// src/Ticket/Ticket.service.ts
import { Injectable } from '@nestjs/common';
import { Ticket, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from 'src/enitity.repository';
import * as lodash from 'lodash';

@Injectable()
export class TicketService
  implements
    Repository<
      Ticket,
      Prisma.TicketCreateInput,
      Prisma.TicketUpdateInput,
      Prisma.TicketWhereInput
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({
      data,
    });
  }

  async find(where: Prisma.TicketWhereInput): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({ where });
  }

  async update(
    where: Prisma.TicketWhereInput,
    data: Prisma.TicketUpdateInput,
  ): Promise<Boolean> {
    await this.prisma.ticket.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where: Prisma.TicketWhereInput): Promise<Boolean> {
    await this.prisma.ticket.deleteMany({
      where,
    });
    return true;
  }

  async count(where: Prisma.TicketWhereInput): Promise<number> {
    return await this.prisma.ticket.count({
      where,
    });
  }

  async sum(where: Prisma.TicketWhereInput, field): Promise<number> {
    const response = await this.prisma.ticket.findMany({
      where,
    });

    return lodash.sumBy(response, field);
  }
}
