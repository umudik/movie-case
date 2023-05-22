// src/session/session.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { SessionService } from './session.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';
import { Roles, RolesGuard } from 'src/auth/role.guard';

@Controller('session')
@UseGuards(RolesGuard)
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('create')
  async createSession(@Body() data: Session): Promise<Session> {
    return await this.sessionService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findAllSessions(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Session[]> {
    return this.sessionService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('update')
  async updateSession(
    @Body() where: Prisma.SessionWhereInput,
    @Body() data: Prisma.SessionUpdateInput,
  ): Promise<Boolean> {
    return await this.sessionService.update(where, data);
  }
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('delete')
  async deleteSession(
    @Body() where: Prisma.SessionWhereInput,
  ): Promise<Boolean> {
    return this.sessionService.delete(where);
  }
}
