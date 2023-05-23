import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, LoginResponseDto } from 'src/dtos/auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({
    type: LoginResponseDto
  })
  async login(@Body() data: LoginDto) {
    if (!data.password || !data.email) {
      throw Error('missing_parameter');
    }
    const user = (
      await this.userService.find({
        email: data.email,
        password: data.password,
      })
    )[0];

    if (!user) {
      throw Error('auth');
    }
    return this.authService.login(user);
  }
}
