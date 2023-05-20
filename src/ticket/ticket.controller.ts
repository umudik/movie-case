// src/ticket/ticket.controller.ts
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from '../../src/auth/logged-in.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(
    @Body() ticketData: Ticket,
    @Request() req,
  ): Promise<Ticket> {
    ticketData.user_id = req.user.id;
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
