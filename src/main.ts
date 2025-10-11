import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './Email/core/domain/exceptions/http.exception.filter';
import type { INestApplication } from '@nestjs/common';

async function setupMicroservices(app: INestApplication): Promise<void> {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'validate_user_email_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}

function setGlobalMiddlewares(app: INestApplication): void {
  app.useGlobalFilters(new HttpExceptionFilter());
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setGlobalMiddlewares(app);
  await setupMicroservices(app);
}

void bootstrap();
