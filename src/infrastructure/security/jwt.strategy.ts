// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../domains/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'umudik', // Please replace 'YOUR_SECRET' with your secret key
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(
      payload.email,
      payload.user,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
