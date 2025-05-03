import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, EventPattern, MessagePattern } from '@nestjs/microservices';
import { SendEmailRequest } from 'src/Email/adapters/in/web/controller/dto/request/send.email.request';
import { SendMailUsecase } from 'src/Email/core/usecases/SendMailUsecase';

@Injectable()
export class RmqProcessService {
  constructor(
    @Inject('EMAIL_IMPORT_SERVICE') private rabbitClient: ClientRMQ,
    @Inject('SendEmailInputPort')
    private readonly SendMailUsecase: SendMailUsecase,
  ) {}

  async handleEmailQueue(emailDTO: SendEmailRequest) {
    console.log(`received a new email: emails:`, emailDTO.email);
    return await this.SendMailUsecase.execute(emailDTO);
  }
}
