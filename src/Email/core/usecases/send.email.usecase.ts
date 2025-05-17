import { SendEmailInputPort } from '../ports/in/send.email.input.port';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailModelIn } from '../domain/models/email.model.in';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  LOG_LEVEL,
  SendRmqMessageInputPort,
} from '../ports/in/send.rmb.message.input.port';

@Injectable()
export class SendMailUsecase implements SendEmailInputPort {
  constructor(
    private readonly configService: ConfigService,
    @Inject('SendRmqMessageInputPort')
    private readonly rabbitService: SendRmqMessageInputPort,
  ) {}

  async execute(emailModelIn: EmailModelIn): Promise<void> {
    const { email, token } = emailModelIn;
    const transport = this.emailTransport();

    const options: nodemailer.SendMailOptions = {
      to: email,
      from: this.configService.get<string>('EMAIL_USERNAME'),
      subject: 'Scholarium - código de cadastro para a platarfoma',
      text: `Seu código de acesso é: ${token}.`,
      html: `<p>Seu código de acesso é: <span style="color: red"> ${token}</span>.</p> `,
    };

    try {
      await transport.sendMail(options);
      this.rabbitService.send({
        level: LOG_LEVEL.LOG,
        message: `Validation email sent successfully to "${email}" with token: ${token}.`,
        date: new Date(),
        module: 'Email Service',
        operation: 'Validate Email',
        user: 'Applicaation',
      });
      console.log('Enviou mensagem para a fila de log');
    } catch (error) {
      throw new InternalServerErrorException(
        'Error sending email',
        error.message,
      );
    }
  }

  private emailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      secure: false,
      port: this.configService.get<number>('PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
    return transporter;
  }
}
