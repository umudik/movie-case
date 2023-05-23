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
import { ApiResponse } from '@nestjs/swagger';
import { TicketDto, TicketFilterDto, TicketUpdateDto } from 'src/dtos/ticket.dto';


@UseGuards(RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    type: TicketDto,
  })
  async createTicket(@Body() data: Ticket, @Request() req): Promise<Ticket> {
    if (req.user) {
      data.user_id = req.user.id;
    }

    return this.ticketService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  @ApiResponse({
    type: TicketDto,
    isArray:true
  })
  async getTickets(@Body() where: Prisma.TicketWhereInput): Promise<Ticket[]> {
    return this.ticketService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiResponse({
    type: Boolean
  })
  async updateTicket(
    @Body() update: TicketUpdateDto,
    @Req() req,
  ): Promise<Boolean> {
    update.where.user_id = req.user.id

    if(update.data.status && update.data.status === "done"){
      const ticktes = await this.ticketService.find(update.where);
      const tickets_are_validated = ticktes.every((ticket)=> ticket.status === "validated")
      if(!tickets_are_validated){
        throw Error("Ticket must be validated")
      }
    }
 
    return await this.ticketService.update(update.where, update.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteTicket(@Body() where: TicketFilterDto): Promise<Boolean> {
    return this.ticketService.delete(where);
  }
}
