import { EmailModelIn } from '../../domain/models/email.model.in';

export interface SendEmailInputPort {
  execute(emailModelIn: EmailModelIn): void;
}
