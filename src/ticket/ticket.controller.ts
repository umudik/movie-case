// src/ticket/ticket.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  async createTicket(
    @Body() ticketData: Prisma.TicketCreateInput,
  ): Promise<Ticket> {
    return this.ticketService.create(ticketData);
  }

  @Post('find')
  async getTickets(@Body() where: Prisma.TicketWhereInput): Promise<Ticket[]> {
    return this.ticketService.find(where);
  }

  @Post('update')
  async updateTicket(
    @Body()
    updateData: {
      where: Prisma.TicketWhereInput;
      data: Prisma.TicketUpdateInput;
    },
  ): Promise<Boolean> {
    return await this.ticketService.update(updateData.where, updateData.data);
  }

  @Post('delete')
  async deleteTicket(@Body() where: Prisma.TicketWhereInput): Promise<Boolean> {
    return this.ticketService.delete(where);
  }
}
