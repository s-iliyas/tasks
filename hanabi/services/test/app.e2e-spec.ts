import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const createDtoData = {
  name: 'Shaik Mohammed Iliyas',
  username: 's-iliyas',
  email: 'shaik@gmail.com',
  phoneNumber: '+919182189384',
  dob: '30-01-1999',
};

const updateDtoData = {
  name: 'Iliyas Shaik',
  username: 's-iliyas',
  email: 'shaik@gmail.com',
  phoneNumber: '+919182189384',
  dob: '30-01-1999',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Server running...');
  });

  it('/user/:username (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/s-iliyas')
      .expect(200);
    expect(response.body).toEqual({ username: 's-iliyas' });
  });

  it('/user/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send(createDtoData)
      .expect(200);
    const { dob, email, name, phoneNumber, username } = response.body;
    expect({ dob, email, name, phoneNumber, username }).toEqual(createDtoData);
  });

  it('/user/update (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/update')
      .send(updateDtoData)
      .expect(200);
    const { dob, email, name, phoneNumber, username } = response.body;
    expect({ dob, email, name, phoneNumber, username }).toEqual(updateDtoData);
  });

  it('/user/:username (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/s-iliyas')
      .expect(200);
    const { dob, email, name, phoneNumber, username } = response.body;
    expect({ dob, email, name, phoneNumber, username }).toEqual(updateDtoData);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
