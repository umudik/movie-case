// src/session/session.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { SessionService } from './session.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';
import { Roles, RolesGuard } from 'src/auth/role.guard';
import { ApiResponse } from '@nestjs/swagger';
import { SessionDto } from 'src/dtos/session.dto';

@Controller('session')
@UseGuards(RolesGuard)
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('create')
  @ApiResponse({
    type: SessionDto
  })
  async createSession(@Body() data: SessionDto): Promise<Session> {
    return await this.sessionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  @ApiResponse({
    type: SessionDto,
    isArray:true
  })
  async findAllSessions(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Session[]> {
    return this.sessionService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('update')
  @ApiResponse({
    type: Boolean
  })
  async updateSession(
    @Body() where: Prisma.SessionWhereInput,
    @Body() data: Prisma.SessionUpdateInput,
  ): Promise<Boolean> {
    return await this.sessionService.update(where, data);
  }
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteSession(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Boolean> {
    return this.sessionService.delete(where);
  }
}
