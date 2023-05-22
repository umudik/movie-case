// src/ticket/ticket.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';
import { RolesGuard } from 'src/auth/role.guard';


@UseGuards(RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')

  async createTicket(@Body() data: Ticket, @Request() req): Promise<Ticket> {
    if (req.user) {
      data.user_id = req.user.id;
    }

    return this.ticketService.create(data);
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
    @Req() req,
  ): Promise<Boolean> {
    updateData.where.user_id = req.user.id;
    return await this.ticketService.update(updateData.where, updateData.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteTicket(@Body() where: Prisma.TicketWhereInput): Promise<Boolean> {
    return this.ticketService.delete(where);
  }
}
