import { Module } from '@nestjs/common';
import { SendMailUsecase } from './core/usecases/send.email.usecase';
import { EmailMapper } from './adapters/in/web/controller/dto/email.mapper';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqProcessController } from './adapters/in/web/controller/rmq.process.controller';
import { SendRmqMessageUsecase } from './core/usecases/send.rmb.message.usecase';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VALIDATE_USER_EMAIL_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'validate_user_email_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SAVE_LOG_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'save_log_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    EmailMapper,
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
