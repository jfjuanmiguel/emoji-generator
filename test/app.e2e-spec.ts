import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = moduleFixture.get<AppService>(AppService);
    await app.init();
  });

  describe(`/ (GET)`, () => {
    it(`should return a random emoji`, () => {
      const emojis = appService.getEmojis();
      return request(app.getHttpServer())
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Chrome`);
          expect(emojis).toContain(response.emoji);
        });
    });

    it(`should return an Unknown browser when no user-agent header is provided`, () => {
      const emojis = appService.getEmojis();
      return request(app.getHttpServer())
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Unknown`);
          expect(emojis).toContain(response.emoji);
        });
    });

    it(`Shoud return 403 Forbidden when an invalid x-api-key header is provided`, () => {
      return request(app.getHttpServer()).get('/').expect(403);
    });
  });

  describe(`/?index=X (GET)`, () => {
    it(`should return the indexed emoji`, () => {
      const index = 0;
      const emojis = appService.getEmojis();
      const emoji = emojis[index];
      return request(app.getHttpServer())
        .get(`/?index=${index}`)
        .set(`x-api-key`, `SECRET`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          expect(response.emoji).toBe(emoji);
        });
    });

    it(`should return 400 if a non-number index is provided`, () => {
      return request(app.getHttpServer())
        .get(`/?index=not-a-number`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });

    it(`should return 400 if an index is out of range`, () => {
      return request(app.getHttpServer())
        .get(`/?index=100`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });
  });
});
