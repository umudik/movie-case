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
      Ticket,
      Prisma.TicketUpdateInput,
      Prisma.TicketWhereInput
    >
{
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    data.status = 'sold';
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
    if (data.status === 'sold') {
      const ticketsToUpdate = await this.prisma.ticket.findMany({
        where,
        include: { Session: { include: { Movie: true } }, User: true },
      });

      for (const ticket of ticketsToUpdate) {
        if (ticket.User.age < ticket.Session.Movie.age_restriction) {
          throw new Error(
            'The user does not meet the age restriction for this movie.',
          );
        }
      }
    }
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
