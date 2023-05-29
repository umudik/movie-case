// src/ticket/ticket.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/infrastructure/security/logged-in.guard';
import { RolesGuard } from 'src/infrastructure/security/role.guard';
import { ApiResponse } from '@nestjs/swagger';
import { TicketDto, TicketFilterDto, TicketUpdateDto } from 'src/domains/ticket/ticket.dto';


@UseGuards(RolesGuard)
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    type: TicketDto,
  })
  async createTicket(@Body() data: TicketDto, @Request() req): Promise<TicketDto> {
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
  async getTickets(@Body() where: TicketFilterDto): Promise<TicketDto[]> {
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
      const validTicketCount = await this.ticketService.count({...update.where, status:{
        not:"validated"
      }});
      
      if(validTicketCount > 0){
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
