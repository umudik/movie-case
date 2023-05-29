import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './domains/auth/auth.controller';
import { UserController } from './domains/user/user.controller';
import { UserService } from './domains/user/user.service';
import { AuthService } from './domains/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MovieController } from './domains/movie/movie.controller';
import { SessionController } from './domains/session/session.controller';
import { TicketController } from './domains/ticket/ticket.controller';
import { MovieService } from './domains/movie/movie.service';
import { SessionService } from './domains/session/session.service';
import { TicketService } from './domains/ticket/ticket.service';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './infrastructure/security/role.guard';
import { UserRepository } from './domains/user/user.repository';
import { MovieRepository } from './domains/movie/movie.repository';
import { SessionRepository } from './domains/session/session.repository';
import { TicketRepository } from './domains/ticket/ticket.repository';

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
    UserRepository,
    MovieService,
    MovieRepository,
    SessionService,
    SessionRepository,
    TicketService,
    TicketRepository,
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
