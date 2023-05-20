import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findAllUsers(
    @Body() where: Prisma.UserWhereUniqueInput,
  ): Promise<User[]> {
    return this.userService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(
    @Body() where: Prisma.UserWhereUniqueInput,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<Boolean> {
    return await this.userService.update(where, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteUser(
    @Body() where: Prisma.UserWhereUniqueInput,
  ): Promise<Boolean> {
    return this.userService.delete(where);
  }
}
