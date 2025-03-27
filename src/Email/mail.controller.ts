import { MailerService } from "@nestjs-modules/mailer";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { EmailDTO } from "./dto/Email.dto";

@Controller('email')
export class mailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send')
    public async sendMail(@Body() email: EmailDTO) {
        return await this.mailService.sendEmail(email)
    }

}