// src/session/session.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post('create')
  async createSession(
    @Body() data: Prisma.SessionCreateInput,
  ): Promise<Session> {
    return this.sessionService.create(data);
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
