import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SendEmailRequest } from './dto/request/send.email.request';
import { SendEmailInputPort } from 'src/Email/core/ports/in/send.email.input.port';
import { EmailMapper } from './dto/email.mapper';

@Controller('email')
export class mailController {
  constructor(
    @Inject('SendEmailInputPort')
    private readonly sendMailUsecase: SendEmailInputPort,
    private readonly emailMapper: EmailMapper,
  ) {}

  @Post('/send')
  public sendMail(@Body() request: SendEmailRequest) {
    console.log(request);
    const emailModelIn =
      this.emailMapper.SendEmailRequestToEmailModelIn(request);
    return this.sendMailUsecase.execute(emailModelIn);
  }
}
