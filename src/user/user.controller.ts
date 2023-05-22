import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/logged-in.guard';
import { RolesGuard } from 'src/auth/role.guard';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  @Post('create')

  async createUser(@Body() data: User): Promise<User> {
    data.role = 'user';
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')

  async findAllUsers(
    @Body() where: Prisma.UserWhereInput,
    @Req() req,
  ): Promise<User[]> {
    if (req.user) {
      where.id = req.user.id;
    }

    return this.userService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(
    @Body() where: Prisma.UserWhereUniqueInput,
    @Body() data: Prisma.UserUpdateInput,
    @Req() req,
  ): Promise<Boolean> {
    where.id = req.user.id;
    return await this.userService.update(where, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteUser(
    @Body() where: Prisma.UserWhereUniqueInput,
    @Req() req,
  ): Promise<Boolean> {
    where.id = req.user.id;
    return this.userService.delete(where);
  }
}
