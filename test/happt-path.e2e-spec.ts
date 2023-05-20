import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Movie, Session } from '@prisma/client';

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
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/create(POST) admin', async () => {
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

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    admin_token = response.body.token;
  });

  it('should create customer 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'u1@test.com' + seed, password: 'test', age: 30 })
      .expect(201);

    expect(response.body.email).toBe('u1@test.com' + seed);
    expect(response.body.age).toBe(30);
    user1 = response.body;
  });
  it('should create customer2 ', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'u2@test.com' + seed, password: 'test', age: 10 })
      .expect(201);

    expect(response.body.email).toBe('u2@test.com' + seed);
    expect(response.body.age).toBe(10);
    user2 = response.body;
  });

  it('should login user 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'u1@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    user1_token = response.body.token;
  });

  it('should login user 2', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'u2@test.com' + seed, password: 'test' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
    user2_token = response.body.token;
  });

  it('should create a movie as admin user', async () => {
    const response = await request(app.getHttpServer())
      .post('/movie/create')
      .set('Authorization', `${admin_token}`)
      .send({
        name: 'Test Movie' + seed,
        age_restriction: 18,
      })
      .expect(201);

    expect(response.body.name).toBe('Test Movie' + seed);
    expect(response.body.age_restriction).toBe(18);
    movie = response.body;
  });

  it('should create a session for a movie', async () => {
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

  it('should buy a ticket for user 1', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/create')
      .set('Authorization', `Bearer ${user1_token}`)
      .send({
        session_id: session.id,
      })
      .expect(201);

    expect(response.body.status).toBe('sold');
    expect(response.body.user_id).toBe(user1.id);
    expect(response.body.session_id).toBe(session.id);
  });

  it('should buy a ticket for user 2', async () => {
    const response = await request(app.getHttpServer())
      .post('/ticket/create')
      .set('Authorization', `Bearer ${user2_token}`)
      .send({
        session_id: session.id,
      })
      .expect(201);

    expect(response.body.status).toBe('sold');
    expect(response.body.user_id).toBe(user2.id);
    expect(response.body.session_id).toBe(session.id);
  });
});
