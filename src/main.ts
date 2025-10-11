import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './Email/core/domain/exceptions/http.exception.filter';

async function bootstrap() {
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
bootstrap();
