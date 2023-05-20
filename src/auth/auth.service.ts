// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, Prisma } from '@prisma/client';
import { createHmac } from 'crypto';

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
    const user = (await this.userService.find({ email }))[0];
    if (user && user.password === this.hashPassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        privateKey: 'umudik',
      }),
    };
  }
}
