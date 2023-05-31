import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { SessionService } from './session.service';
import { JwtAuthGuard } from 'src/infrastructure/security/logged-in.guard';
import { Roles, RolesGuard } from 'src/infrastructure/security/role.guard';
import { ApiResponse } from '@nestjs/swagger';
import { SessionDto, SessionFilterDto, SessionUpdateDto } from 'src/domains/session/session.dto';

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
    @Body() where: SessionFilterDto,
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
    @Body() update: SessionUpdateDto,
  ): Promise<Boolean> {
    return await this.sessionService.update(update.where, update.data);
  }

  
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteSession(
    @Body() where: SessionFilterDto,
  ): Promise<Boolean> {
    return this.sessionService.delete(where);
  }
}
