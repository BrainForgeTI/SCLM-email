import { SendEmailInputPort } from '../ports/in/send.email.input.port';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailModelIn } from '../domain/models/email.model.in';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SendMailUsecase implements SendEmailInputPort {
  constructor(private readonly configService: ConfigService) {}

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
