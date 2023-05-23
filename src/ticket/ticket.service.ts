// src/Ticket/Ticket.service.ts
import { Injectable, Req } from '@nestjs/common';
import { Ticket, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from 'src/enitity.repository';
import * as lodash from 'lodash';
import { UserService } from 'src/user/user.service';
import { SessionService } from 'src/session/session.service';
import { MovieService } from 'src/movie/movie.service';

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
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private sessionService: SessionService,
    private movieService: MovieService,
  ) {}

  async create(ticket: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    ticket.status = 'waiting';

    const user = (
      await this.userService.find({
        id: ticket.user_id,
      })
    )[0];

    const session = (
      await this.sessionService.find({
        id: ticket.session_id,
      })
    )[0];

    const movie = (
      await this.movieService.find({
        id: session.movie_id,
      })
    )[0];

    if (user.age < movie.age_restriction) {
      throw new Error(
        'The user does not meet the age restriction for this movie.',
      );
    }

    return this.prisma.ticket.create({
      data: ticket,
    });
  }

  async find(where: Prisma.TicketWhereInput): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({ where });
  }

  async update(
    where: Prisma.TicketWhereInput,
    data: Partial<Ticket>,
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
