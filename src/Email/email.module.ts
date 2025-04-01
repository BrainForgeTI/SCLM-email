import { Module } from '@nestjs/common';
import { mailController } from './adapters/in/web/controller/email.controller';
import { SendMailUsecase } from './core/usecases/SendMailUsecase';
import { EmailMapper } from './adapters/in/web/controller/dto/email.mapper';

@Module({
  imports: [],
  providers: [
    EmailMapper,
    {
      provide: 'SendEmailInputPort',
      useClass: SendMailUsecase,
    },
  ],
  controllers: [mailController],
})
export class MailModule {}
