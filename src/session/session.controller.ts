// src/session/session.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../../src/auth/logged-in.guard';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post('create')
  async createSession(@Body() data: Session): Promise<Session> {
    return await this.sessionService.create(data);
  }

  @Post('find')
  async findAllSessions(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Session[]> {
    return this.sessionService.find(where);
  }

  @Post('update')
  async updateSession(
    @Body() where: Prisma.SessionWhereInput,
    @Body() data: Prisma.SessionUpdateInput,
  ): Promise<Boolean> {
    return await this.sessionService.update(where, data);
  }

  @Post('delete')
  async deleteSession(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Boolean> {
    return this.sessionService.delete(where);
  }
}
