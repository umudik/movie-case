import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {  Prisma } from '@prisma/client';
import * as lodash from 'lodash';
import {  TicketDto, TicketFilterDto } from './ticket.dto';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async create(ticket:TicketDto): Promise<TicketDto> {
    return this.prisma.ticket.create({ data: ticket });
  }

  async find(where:TicketFilterDto): Promise<TicketDto[]> {
    return this.prisma.ticket.findMany({ where });
  }

  async update(
    where:TicketFilterDto,
    data:Partial<TicketDto>,
  ): Promise<Boolean> {
    await this.prisma.ticket.updateMany({
      where,
      data,
    });
    return true;
  }

  async delete(where:TicketFilterDto): Promise<Boolean> {
    await this.prisma.ticket.deleteMany({
      where,
    });
    return true;
  }

  async count(where:TicketFilterDto): Promise<number> {
    return await this.prisma.ticket.count({
      where,
    });
  }

  async sum(where:TicketFilterDto, field): Promise<number> {
    const response = await this.prisma.ticket.findMany({
      where,
    });
    return lodash.sumBy(response, field);
  }
}
