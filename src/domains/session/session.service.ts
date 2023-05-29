// src/Session/Session.service.ts

import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { SessionDto, SessionFilterDto } from './session.dto';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async create(data: SessionDto): Promise<SessionDto> {
    return this.sessionRepository.create(data);
  }

  async find(where: SessionFilterDto): Promise<SessionDto[]> {
    return this.sessionRepository.find(where);
  }

  async update(
    where: SessionFilterDto,
    data: Partial<SessionDto>,
  ): Promise<Boolean> {
    return this.sessionRepository.update(where, data);
  }

  async delete(where: SessionFilterDto): Promise<Boolean> {
    return this.sessionRepository.delete(where);
  }

  async count(where: SessionFilterDto): Promise<number> {
    return this.sessionRepository.count(where);
  }

  async sum(where: SessionFilterDto, field): Promise<number> {
    return this.sessionRepository.sum(where, field);
  }
}
