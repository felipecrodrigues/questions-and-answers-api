import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from '../domain/entities/question';
import { Repository } from 'typeorm';
import { QuestionService } from './question.service';
import * as faker from 'faker';
import { BadRequestException } from '@nestjs/common';

function mockQuestionResponse(id: number) {
  const question = new Question();
  question.Id = id;
  question.Question = faker.lorem.sentence();
  question.Answer = faker.lorem.paragraph();
  return question;
}

function mockSqlInjectionQuestion() {
  const question = new Question();
  question.Question = 'test\', null); delete from "question";';
  return question;
}

function mockSqlInjectionAnswer(id: number) {
  const question = new Question();
  question.Id = id;
  question.Question = faker.lorem.sentence();
  question.Question = 'test\', null); delete from "question";';
  return question;
}

describe('QuestionService', () => {
  let questionService: QuestionService;
  let questionRepository: Repository<Question>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useFactory: () => ({
            find: jest.fn(() => {
              return [mockQuestionResponse(faker.random.number())];
            }),
            findOne: (id) => mockQuestionResponse(id),
            save: jest.fn((question: Question) => {
              if (!question.Id) {
                question.Id = faker.random.number();
              }
              return question;
            }),
          })
        },
      ],
    }).compile();

    questionService = module.get(QuestionService);
    questionRepository = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  describe('list questions', () => {

    it('should return a list of questions', async () => {
      const questions = await questionService.getQuestions();
      expect(questions.length).toBeGreaterThan(0);
    });
    
    it('should return null when there is a repository error', async () => {      
      jest.spyOn(questionRepository, 'find').mockImplementation(() => { throw new Error() });
      const questions = await questionService.getQuestions();
      expect(questions).toBeNull();
    });

  });

  describe('get a question by id', () => {

    it('should return a single question', async () => {
      const id = faker.random.number();
      const question = await questionService.getQuestionById(id);
      expect(question).toBeInstanceOf(Question);
    });

    it('should throw an error if id is negative', async () => {
      const id = faker.random.number() * -1;
      try {
        await questionService.getQuestionById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    
    it('should return null when there is a repository error', async () => {   
      const id = faker.random.number();
      jest.spyOn(questionRepository, 'findOne').mockImplementation(() => { throw new Error() });
      const questions = await questionService.getQuestionById(id);
      expect(questions).toBeNull();
    });

  });
  
  describe('save a question', () => {

    it('should create a new question (without id)', async () => {
      const question = mockQuestionResponse(null);
      const newQuestion = await questionService.saveQuestion(question);
      
      expect(newQuestion.Id).toBeGreaterThan(0);
      expect(newQuestion.Question).toBe(question.Question);
      expect(newQuestion.Answer).toBe(question.Answer);
      expect(questionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should save an question with id', async () => {
      const id = faker.random.number();
      const question = mockQuestionResponse(id);
      const newQuestion = await questionService.saveQuestion(question);

      expect(question.Id).toBe(newQuestion.Id);
      expect(questionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if description is empty', async () => {
      const question = new Question();
      try {
        await questionService.saveQuestion(question);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(questionRepository.save).toHaveBeenCalledTimes(0);
      }
    });

    it('should throw an error if there is only one word', async () => {
      const question = new Question();
      question.Question = faker.lorem.word();
      try {
        await questionService.saveQuestion(question);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(questionRepository.save).toHaveBeenCalledTimes(0);
      }
    });

    it('should save the question disregarding of SQL Injection attempts', async () => {
      const question = mockSqlInjectionQuestion();
      const newQuestion = await questionService.saveQuestion(question);
      
      expect(newQuestion.Id).toBeGreaterThan(0);
      expect(newQuestion.Question).toBe(question.Question);
      expect(questionRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should save the question disregarding of SQL Injection attempts', async () => {
      const id = faker.random.number();
      const question = mockSqlInjectionAnswer(id);
      const newQuestion = await questionService.saveQuestion(question);
      
      expect(question.Id).toBe(newQuestion.Id);
      expect(newQuestion.Question).toBe(question.Question);
      expect(newQuestion.Answer).toBe(question.Answer);
      expect(questionRepository.save).toHaveBeenCalledTimes(1);
    });
    
    it('should return null when there is a repository error', async () => {   
      const question = mockQuestionResponse(null);
      jest.spyOn(questionRepository, 'save').mockImplementation(() => { throw new Error() });
      const newQuestion = await questionService.saveQuestion(question);
      expect(newQuestion).toBeNull();
    });

  });

});
