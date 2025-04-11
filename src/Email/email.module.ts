import { Module } from '@nestjs/common';
import { mailController } from './adapters/in/web/controller/email.controller';
import { SendMailUsecase } from './core/usecases/SendMailUsecase';
import { EmailMapper } from './adapters/in/web/controller/dto/email.mapper';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqProcessController } from './rabbitmq/rmq-process.controller';
import { RmqProcessService } from './rabbitmq/rmq-process.service';

@Module({
  imports: [ClientsModule.register([
        {
          name: 'EMAIL_IMPORT_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'user_import_queue',
            queueOptions: {
              durable: false,
            }
          }
        }
      ])],
  providers: [
    EmailMapper, RmqProcessService,
    {
      provide: 'SendEmailInputPort',
      useClass: SendMailUsecase,
    },
  ],
  controllers: [mailController, RmqProcessController],
})
export class MailModule {}
