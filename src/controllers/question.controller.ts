import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { QuestionDTO } from '../domain/dtos/question-dto';
import { Question } from '../domain/entities/question';
import { GetByIdParams } from '../infra/validators/getByIdParams';
import { QuestionService } from '../services/question.service';

@Controller('question')
@ApiTags('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    @ApiOperation({ description: "Get all questions." })
    async getQuestions(): Promise<Question[]> {
        return await this.questionService.getQuestions();
    }

    @Get(':id')
    @ApiOperation({ description: "Get a single question by id." })
    @ApiParam({ name: 'id', description: 'Question ID' })
    async getQuestionById(@Param() params: GetByIdParams): Promise<Question> {
        return await this.questionService.getQuestionById(params.id);
    }

    @Post()    
    @ApiBody({type: QuestionDTO})
    @ApiOperation({ description: "Update an existing question or create a new one." })
    async saveQuestion(@Body() request: QuestionDTO): Promise<Question> {
        return await this.questionService.saveQuestion(request);
    }
}
