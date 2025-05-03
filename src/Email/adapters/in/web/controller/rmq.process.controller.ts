import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailRequest } from './dto/request/send.email.request';
import { SendEmailInputPort } from 'src/Email/core/ports/in/send.email.input.port';

@Controller()
export class RmqProcessController {
  constructor(
    @Inject('SendEmailInputPort')
    private readonly SendMailUsecase: SendEmailInputPort,
  ) {}

  @EventPattern('email_queue')
  async handleEmailQueue(@Payload() data: SendEmailRequest) {
    console.log('Evento recebido na fila email_queue:', data);
    return this.SendMailUsecase.execute(data);
  }
}
