import { EmailDTO } from "src/Email/adapters/in/web/controller/dto/email.dto";

export interface SendEmailInputPort {
    execute(dto: EmailDTO): void
}