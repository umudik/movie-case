// src/ticket/ticket.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTicket(@Body() ticketData: Ticket): Promise<Ticket> {
    ticketData.user_id = 0;
    return this.ticketService.create(ticketData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async getTickets(@Body() where: Prisma.TicketWhereInput): Promise<Ticket[]> {
    return this.ticketService.find(where);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteTicket(@Body() where: Prisma.TicketWhereInput): Promise<Boolean> {
    return this.ticketService.delete(where);
  }
}
