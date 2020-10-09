import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { QuestionModule } from '../src/modules/question.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuestionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

});
