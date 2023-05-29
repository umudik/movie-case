import { Injectable } from '@nestjs/common';
import {  Prisma } from '@prisma/client';
import { TicketDto, TicketFilterDto } from './ticket.dto';
import { TicketRepository } from './ticket.repository';
import { UserRepository } from '../user/user.repository';
import { SessionRepository } from '../session/session.repository';
import { MovieRepository } from '../movie/movie.repository';
import { Errors } from 'src/infrastructure/error/error';

@Injectable()
export class TicketService {
  constructor(
    private ticketRepository: TicketRepository,
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private movieRepository: MovieRepository,
  ) {}

  async create(ticket:TicketDto): Promise<TicketDto> {
    ticket.status = 'waiting';

    const user = (
      await this.userRepository.find({
        id:{equals: ticket.user_id,}
      })
    )[0];

    const session = (
      await this.sessionRepository.find({
        id: {equals:ticket.session_id,}
      })
    )[0];

    const movie = (
      await this.movieRepository.find({
        id: {equals:session.movie_id}
      })
    )[0];

    if (user.age < movie.age_restriction) {
      throw new Error(Errors.AGE_RESTRICTION);
    }

    return this.ticketRepository.create(ticket);
  }

  async find(where: TicketFilterDto): Promise<TicketDto[]> {
    return this.ticketRepository.find(where);
  }

  async update(
    where: TicketFilterDto,
    data: Partial<TicketDto>,
  ): Promise<Boolean> {
    return this.ticketRepository.update(where, data);
  }

  async delete(where: TicketFilterDto): Promise<Boolean> {
    return this.ticketRepository.delete(where);
  }

  async count(where: TicketFilterDto): Promise<number> {
    return await this.ticketRepository.count(where);
  }

  async sum(where: TicketFilterDto, field): Promise<number> {
    return await this.ticketRepository.sum(where, field);
  }
}
