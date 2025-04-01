import { SendEmailInputPort } from '../ports/in/SendEmailInputPort';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailModelIn } from '../domain/models/EmailModelIn';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailUsecase implements SendEmailInputPort {
  constructor(private readonly configService: ConfigService) {}

  async execute(emailModelIn: EmailModelIn): Promise<void> {
    const { email } = emailModelIn;
    const transport = this.emailTransport();
    const lista = this.tokenRandom();

    const options: nodemailer.SendMailOptions = {
      to: email,
      from: this.configService.get<string>('EMAIL_USERNAME'),
      subject: 'Scholarium - código de cadastro para a platarfoma',
      text: `Seu código de acesso é: ${lista}.`,
      html: `<p>Seu código de acesso é: ${lista}.</p> `,
    };

    await transport.sendMail(options);
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

  private getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private tokenRandom() {
    const list: Array<number> = [];
    for (let i = 0; i < 4; i++) {
      list.push(this.getRandom(1, 9));
    }
    return list;
  }
}
