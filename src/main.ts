import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './Email/core/domain/exceptions/http.exception.filter';
import type { INestApplication } from '@nestjs/common';
import { CustomConfigService } from './Common/services/custom.config.service';

async function setupMicroservices(
  app: INestApplication,
  cs: CustomConfigService,
): Promise<void> {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [cs.get<string>('RABBITMQ_URL')],
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
  const cs = app.get<CustomConfigService>(CustomConfigService);

  setGlobalMiddlewares(app);
  await setupMicroservices(app, cs);
}

void bootstrap();
