import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../domain/entities/question';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    private readonly logger = new Logger(QuestionService.name);

    constructor(@InjectRepository(Question)private readonly questionRepository: Repository<Question>) { }

    async getQuestions() : Promise<Question[]> {
        try{
            return await this.questionRepository.find();
        } catch(error) {
            this.logger.error(`Error loading questions from database: Error message: ${error}`);
            return null;
        }
    }

    async getQuestionById(questionId: number) : Promise<Question> {

        if (questionId <= 0) {
            throw new BadRequestException(questionId, "Id must be greater than 0.")
        }

        try{
            return await this.questionRepository.findOne({ Id: questionId });
        } catch(error) {
            this.logger.error(`Error loading question ${questionId} from database: Error message: ${error}`);
            return null;
        }
    }

    async saveQuestion(question: Question) : Promise<Question> { 

        if (!question.Question) {
            throw new BadRequestException(question.Question, "Question must have a description.")
        } 

        try{
            return await this.questionRepository.save(question);
        } catch(error) {
            this.logger.error(`Error saving question ${question.Id}: Error message: ${error}`);
            return null;
        }
    }
}
