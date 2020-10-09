import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/domain/entities/question';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            entities: ["dist/src/domain/entities/*{.ts,.js}"],
            namingStrategy: new SnakeNamingStrategy(),
            synchronize: false,
            logging: []
        }),
        TypeOrmModule.forFeature([Question])
    ],
    controllers: [QuestionController],
    providers: [QuestionService]
})
export class QuestionModule {}
