import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MovieController } from './movie/movie.controller';
import { SessionController } from './session/session.controller';
import { TicketController } from './ticket/ticket.controller';
import { MovieService } from './movie/movie.service';
import { SessionService } from './session/session.service';
import { TicketService } from './ticket/ticket.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'umudik',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [
    UserController,
    MovieController,
    SessionController,
    TicketController,
    AuthController,
  ],
  providers: [
    PrismaService,
    UserService,
    MovieService,
    SessionService,
    TicketService,
    AuthService,
    JwtStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
