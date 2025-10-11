import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailRequest } from './dto/request/send.email.request';
import { SendEmailInputPort } from 'src/Email/core/ports/in/send.email.input.port';
import { EmailMapper } from './dto/email.mapper';

@Controller()
export class RmqProcessController {
  constructor(
    @Inject('SendEmailInputPort')
    private readonly SendMailUsecase: SendEmailInputPort,
    private readonly emailMapper: EmailMapper,
  ) {}

  @EventPattern('validate_user_email_queue')
  async handleEmailQueue(@Payload() request: SendEmailRequest) {
    const emailModelIn =
      this.emailMapper.SendEmailRequestToEmailModelIn(request);
    return this.SendMailUsecase.execute(emailModelIn);
  }
}
