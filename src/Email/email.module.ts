import { Module } from '@nestjs/common';
import { mailController } from './adapters/in/web/controller/email.controller';
import { SendMailUsecase } from './core/usecases/SendMailUsecase';

@Module({
  imports: [],
  providers: [
    {
      provide: 'SendEmailInputPort',
      useClass: SendMailUsecase
    }
  ],
  controllers: [mailController],
})
export class MailModule {}
