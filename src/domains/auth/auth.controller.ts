import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/domains/user/user.service';
import { LoginDto, LoginResponseDto } from 'src/domains/auth/auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Errors } from 'src/infrastructure/error/error';

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
      throw Error(Errors.MISSING_PARAMETER);
    }
    const user = (
      await this.userService.find({
        email: {
          equals:data.email
        },
        password:{equals: data.password}
      })
    )[0];

    if (!user) {
      throw Error(Errors.AUTH);
    }
    return this.authService.login(user);
  }
}
