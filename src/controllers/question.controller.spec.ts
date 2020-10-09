import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../services/question.service';
import { GetByIdParams } from '../infra/validators/getByIdParams';
import * as faker from 'faker';
import { QuestionDTO } from '../domain/dtos/question-dto';
import { Question } from '../domain/entities/question';
import { BadRequestException } from '@nestjs/common';

describe('QuestionController', () => {
  let questionController: QuestionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [        
        {
          provide: QuestionService,
          useFactory: () => ({
            getQuestions: jest.fn(() =>([])),
            getQuestionById: jest.fn(() =>(new Question())),
            saveQuestion: jest.fn(() =>(new Question()))
          })
      },
      ],
    }).compile();

    questionController = app.get<QuestionController>(QuestionController);
  });

  describe('list questions', () => {
    it('should return a list of questions', async () => {
      expect(await questionController.getQuestions()).toStrictEqual([]);
    });
  });

  describe('get questions by id', () => 
  {

    it('should return a single question', async () => {
      const params = new GetByIdParams();
      params.id = faker.random.number();
      const question = await questionController.getQuestionById(params);
      expect(question).toBeDefined();
    });

    it('should throw an error for invalid id', async () => {
      const params = new GetByIdParams();
      try {
        await questionController.getQuestionById(params);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

  });

  describe('save a question', () => {

    it('should create a new question (without id)', async () => {
      const questionDTO = new QuestionDTO();
      questionDTO.Question = faker.lorem.sentence();
      const question = await questionController.saveQuestion(questionDTO);
      expect(question).toBeInstanceOf(Question);
    });

    it('should save an question with id', async () => {
      const questionDTO = new QuestionDTO();
      questionDTO.Id = faker.random.number();
      questionDTO.Question = faker.lorem.sentence();
      questionDTO.Answer = faker.lorem.paragraph();
      const question = await questionController.saveQuestion(questionDTO);
      expect(question).toBeInstanceOf(Question);
    });

    it('should throw an error if description is empty', async () => {
      const questionDTO = new QuestionDTO();
      try {
        await questionController.saveQuestion(questionDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

  });

});
