import { EmailModelIn } from '../../domain/models/EmailModelIn';

export interface SendEmailInputPort {
  execute(emailModelIn: EmailModelIn): void;
}
