import { SendEmailInputPort } from '../ports/in/SendEmailInputPort';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailModelIn } from '../domain/models/EmailModelIn';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailUsecase implements SendEmailInputPort {
  constructor(private readonly configService: ConfigService) { }

  async execute(emailModelIn: EmailModelIn): Promise<void> {
    const { email, token } = emailModelIn;
    const transport = this.emailTransport();

    const options: nodemailer.SendMailOptions = {
      to: email,
      from: this.configService.get<string>('EMAIL_USERNAME'),
      subject: 'Scholarium - código de cadastro para a platarfoma',
      text: `Seu código de acesso é: ${token}.`,
      html: `<p>Seu código de acesso é: ${token}.</p> `,
    };

    await transport.sendMail(options);
    console.log('Email sent successfully!');
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
