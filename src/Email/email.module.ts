/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { SendMailUsecase } from './core/usecases/send.email.usecase';
import { EmailMapper } from './adapters/in/web/controller/dto/email.mapper';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { RmqProcessController } from './adapters/in/web/controller/rmq.process.controller';
import { SendRmqMessageUsecase } from './core/usecases/send.rmb.message.usecase';
import { CustomConfigService } from 'src/Common/services/custom.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'VALIDATE_USER_EMAIL_QUEUE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (
          configService: CustomConfigService,
        ): Promise<ClientProvider> => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'validate_user_email_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
      {
        name: 'SAVE_LOG_QUEUE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (
          configService: CustomConfigService,
        ): Promise<ClientProvider> => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'save_log_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    EmailMapper,
    CustomConfigService,
    {
      provide: 'SendEmailInputPort',
      useClass: SendMailUsecase,
    },
    {
      provide: 'SendRmqMessageInputPort',
      useClass: SendRmqMessageUsecase,
    },
  ],
  controllers: [RmqProcessController],
})
export class MailModule {}
