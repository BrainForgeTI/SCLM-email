import { Injectable } from '@nestjs/common';
import { SendEmailRequest } from './request/send.email.request';
import { EmailModelIn } from 'src/Email/core/domain/models/email.model.in';

@Injectable()
export class EmailMapper {
  SendEmailRequestToEmailModelIn(request: SendEmailRequest): EmailModelIn {
    return new EmailModelIn(request.email, request.token);
  }
}
