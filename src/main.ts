import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './Email/core/domain/exceptions/http.exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const queues = ['validate_user_email_queue'];

  for (const queue of queues) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.startAllMicroservices();
}
bootstrap()
  .then(() => console.log('App started'))
  .catch((err) => console.error(err));
