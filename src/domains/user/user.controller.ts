import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/infrastructure/security/logged-in.guard';
import { RolesGuard } from 'src/infrastructure/security/role.guard';
import { UserDto, UserFilterDto, UserUpdateDto } from 'src/domains/user/user.dto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  @Post('create')
  @ApiResponse({
    type: UserDto
  })
  async createUser(@Body() data: UserDto): Promise<User> {
    data.role = 'user';
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  @ApiResponse({
    type: UserDto,
    isArray:true
  })
  async findAllUsers(
    @Body() where: UserFilterDto,
    @Req() req,
  ): Promise<User[]> {
    if (req.user) {
      where.id = req.user.id;
    }

    return this.userService.find(where);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiResponse({
    type: Boolean
  })
  async updateUser(
    @Body() update: UserUpdateDto,
    @Req() req,
  ): Promise<Boolean> {
    update.where.id = req.user.id;
    return await this.userService.update(update.where, update.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  @ApiResponse({
    type: Boolean
  })
  async deleteUser(
    @Body() where: UserFilterDto,
    @Req() req,
  ): Promise<Boolean> {
    where.id = req.user.id;
    return this.userService.delete(where);
  }
}
