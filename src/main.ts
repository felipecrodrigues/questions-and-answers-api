import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QuestionModule } from './modules/question.module';

async function bootstrap() {
    const app = await NestFactory.create(QuestionModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix(process.env.URL_ROUTE_PREFIX);

    const options = new DocumentBuilder()
        .setTitle('QuestionsAndAnswers API')
        .setVersion('1.0')
        .build();
      
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(process.env.URL_ROUTE_PREFIX, app, document);
    
    await app.listen(3000);
}

bootstrap();
