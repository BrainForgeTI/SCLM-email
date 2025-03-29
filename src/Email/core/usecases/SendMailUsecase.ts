import { EmailDTO } from "src/Email/adapters/in/web/controller/dto/email.dto";
import { SendEmailInputPort } from "../ports/in/SendEmailInputPort";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';

export class SendMailUsecase implements SendEmailInputPort {
    constructor(private readonly configService: ConfigService) { }

    async execute(dto: EmailDTO): Promise<void> {
        const { email } = dto;
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

    private getRandom(min, max) {
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