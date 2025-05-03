import { Module } from '@nestjs/common';
import { SendMailUsecase } from './core/usecases/send.email.usecase';
import { EmailMapper } from './adapters/in/web/controller/dto/email.mapper';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqProcessController } from './adapters/in/web/controller/rmq.process.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_IMPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_import_queue',
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
  ],
  controllers: [RmqProcessController],
})
export class MailModule {}
