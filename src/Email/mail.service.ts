import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailDTO } from './dto/Email.dto';
@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  emailTransport() {
    const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            secure: false,
            port: this.configService.get<number>('PORT'),
            auth: {
              user: this.configService.get<string>('EMAIL_USERNAME'),
              pass: this.configService.get<string>('EMAIL_PASSWORD')
            },
    })
    return transporter;
  }

  async sendEmail(dto: EmailDTO) {
    const {email} = dto;
    const transport = this.emailTransport();
    const lista = this.tokenRandom();
    const options: nodemailer.SendMailOptions = {
        to: email,
        from: this.configService.get<string>('EMAIL_USERNAME'),
        subject: 'Scholarium - código de cadastro para a platarfoma',
        text: `Seu código de acesso é: ${lista}.`, 
        html: `<p>Seu código de acesso é: ${lista}.</p> `,
    }


    try {
        await transport.sendMail(options);
        console.log(lista)
    } catch (error) {
        console.log('Erro enviando e-mail: ', error);
    }
  }

  private getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private tokenRandom() {
    let list: Array<number> = [];
    for (let i = 0; i < 4; i++) {
      list.push(this.getRandom(1,9));
    }
    return list;
  }

 


}
