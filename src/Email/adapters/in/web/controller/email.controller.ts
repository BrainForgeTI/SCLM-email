import { Body, Controller, Post } from '@nestjs/common';
import { EmailDTO } from './dto/email.dto';
import { SendEmailInputPort } from 'src/Email/core/ports/in/SendEmailInputPort';

@Controller('email')
export class mailController {
  constructor(
    private readonly sendMailUsecase: SendEmailInputPort
  ) {}

  // receber o email via param, talvez criptar o email com o bcrypt com uma chave que só os dois microserviços sabem. Talvez externalizar essa chave também.
  @Post('/send')
  public sendMail(@Body() email: EmailDTO) {
    return this.sendMailUsecase.execute(email);
  }
}
