import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';

const createNoteDto = {
  title: 'Learn LLMs RAG Concept',
  body: 'Document Loader, Splitter, etc...',
};

const updateNoteDto = {
  title: 'Updated Title',
  body: 'Updated Body Content',
};

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  let createdNoteId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notes (POST) - Create Note', async () => {
    const response = await request(app.getHttpServer())
      .post('/notes')
      .send(createNoteDto)
      .expect(201);

    createdNoteId = response.body.id; // Capture the created note's ID
    expect(response.body).toMatchObject(createNoteDto);
  });

  it('/notes/:id (GET) - Get Note by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/notes/${createdNoteId}`)
      .expect(200);

    expect(response.body).toMatchObject(createNoteDto);
  });

  it('/notes (GET) - Find Notes by Title', async () => {
    const response = await request(app.getHttpServer())
      .get('/notes')
      .query({ title: createNoteDto.title })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(createNoteDto)]),
    );
  });

  it('/notes/:id (PUT) - Update Note by ID', async () => {
    const response = await request(app.getHttpServer())
      .put(`/notes/${createdNoteId}`)
      .send(updateNoteDto)
      .expect(200);

    expect(response.body).toMatchObject(updateNoteDto);
  });

  afterAll(async () => {
    await app.close();
  });
});
