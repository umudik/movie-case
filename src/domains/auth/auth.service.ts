// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, Prisma } from '@prisma/client';
import { createHmac } from 'crypto';
import * as lodash from 'lodash';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): string {
    return createHmac('sha256', password).digest('hex');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.userService.find({ email:{
      equals:email
    }, password:{
      equals:password
    } }))[0];
    return user;
  }

  async login(user: User) {
    const payload = lodash.omit(user, 'password');
    return {
      token: this.jwtService.sign(payload, {
        privateKey: 'umudik',
      }),
    };
  }
}
