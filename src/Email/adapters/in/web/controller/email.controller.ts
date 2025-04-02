import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SendEmailRequest } from './dto/request/send.email.request';
import { SendEmailInputPort } from 'src/Email/core/ports/in/SendEmailInputPort';
import { EmailMapper } from './dto/email.mapper';

@Controller('email')
export class mailController {
  constructor(
    @Inject('SendEmailInputPort')
    private readonly sendMailUsecase: SendEmailInputPort,
    private readonly emailMapper: EmailMapper,
  ) { }

  // receber o email via param, talvez criptar o email com o bcrypt com uma chave que só os dois microserviços sabem. Talvez externalizar essa chave também.
  @Post('/send')
  public sendMail(@Body() request: SendEmailRequest) {
    console.log(request);
    const emailModelIn =
      this.emailMapper.SendEmailRequestToEmailModelIn(request);
    return this.sendMailUsecase.execute(emailModelIn);
  }
}
