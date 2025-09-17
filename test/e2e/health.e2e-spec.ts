import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// import * as nock from "nock";
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

describe('Health', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET health', async () => {
    const response = await (request as any)(app.getHttpServer()).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
