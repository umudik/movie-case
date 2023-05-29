import { Injectable } from '@nestjs/common';
import {  Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UserDto, UserFilterDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput): Promise<UserDto> {
    return this.userRepository.create(data);
  }

  async find(where: UserFilterDto): Promise<UserDto[]> {
    return this.userRepository.find(where);
  }

  async update(
    where: UserFilterDto,
    data: Partial<UserDto>,
  ): Promise<Boolean> {
    return this.userRepository.update(where, data);
  }

  async delete(where: UserFilterDto): Promise<Boolean> {
    return this.userRepository.delete(where);
  }

  async count(where: UserFilterDto): Promise<number> {
    return this.userRepository.count(where);
  }

  async sum(where: UserFilterDto, field): Promise<number> {
    return this.userRepository.sum(where, field);
  }
}
