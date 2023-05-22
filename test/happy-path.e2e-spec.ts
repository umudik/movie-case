import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie, Session, Ticket } from '@prisma/client';
import * as assert from 'assert';
import * as lodash from 'lodash';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  const seed = Date.now();
  let app: INestApplication;
  let prismaService: PrismaService;
  let admin_token = null;
  let user1_token = null;
  let user2_token = null;
  let user1 = null;
  let user2 = null;
  let movie: Movie = null;
  let session: Session = null;
  let ticket_1: Ticket = null;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'test@test.com' + seed, password: 'test', age: 20 })
      .expect(201);

    await prismaService.user.updateMany({
      where: {
        id: response.body.id,
      },
      data: {
        role: 'admin',
      },
    });
  });

  it('login admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    admin_token = response.body.token;
  });

  it('create customer 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'u1@test.com' + seed, password: 'test', age: 30 })
      .expect(201);

    expect(response.body.email).toBe('u1@test.com' + seed);
    expect(response.body.age).toBe(30);
    user1 = response.body;
  });
  it('create customer2 ', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'u2@test.com' + seed, password: 'test', age: 10 })
      .expect(201);

    expect(response.body.email).toBe('u2@test.com' + seed);
    expect(response.body.age).toBe(10);
    user2 = response.body;
  });

  it('login user 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'u1@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    user1_token = response.body.token;
  });

  it('login user 2', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'u2@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    user2_token = response.body.token;
  });

  it('create a movie as admin user', async () => {
    const response = await request(app.getHttpServer())
      .post('/movie/create')
      .set('Authorization', `Bearer ${admin_token}`)
      .send({
        name: 'Test Movie' + seed,
        age_restriction: 18,
      })
      .expect(201);

    expect(response.body.name).toBe('Test Movie' + seed);
    expect(response.body.age_restriction).toBe(18);
    movie = response.body;
  });

  it('create a session for a movie', async () => {
    const response = await request(app.getHttpServer())
      .post('/session/create')
      .set('Authorization', `Bearer ${admin_token}`)
      .send({
        date: new Date(),
        time_slot: '18:00',
        room_no: 1,
        movie_id: movie.id,
      })
      .expect(201);

    expect(response.body.time_slot).toBe('18:00');
    expect(response.body.room_no).toBe(1);
    expect(response.body.movie_id).toBe(movie.id);
    session = response.body;
  });

  it('buy a ticket for user 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/create')
      .set('Authorization', `Bearer ${user1_token}`)
      .send({
        session_id: session.id,
      })
      .expect(201);

    expect(response.body.status).toBe('waiting');
    expect(response.body.user_id).toBe(user1.id);
    expect(response.body.session_id).toBe(session.id);
    ticket_1 = response.body;
  });

  it('buy a ticket for user 2', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/create')
      .set('Authorization', `Bearer ${user2_token}`)
      .send({
        session_id: session.id,
      })
      .expect(500);
    //The user does not meet the age restriction for this movie.
  });

  it('validate ticket before the show', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/update')
      .set('Authorization', `Bearer ${user1_token}`)
      .send({
        where: {
          id: ticket_1.id,
        },
        data: {
          status: 'validated',
        },
      })
      .expect(201);
  });

  it('watch the film', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/update')
      .set('Authorization', `Bearer ${user1_token}`)
      .send({
        where: {
          id: ticket_1.id,
        },
        data: {
          status: 'watched',
        },
      })
      .expect(201);
  });

  it('movie list must be public', async () => {
    const response = await request(app.getHttpServer())
      .post('/movie/find')
      .send({})
      .expect(201);

    assert.equal(lodash.isArray(response.body), true);
  });
});
