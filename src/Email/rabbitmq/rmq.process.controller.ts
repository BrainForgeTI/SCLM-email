import { Controller } from '@nestjs/common';
import { RmqProcessService } from './rmq.process.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class RmqProcessController {
  constructor(private readonly rmqProcessService: RmqProcessService) {}

  @EventPattern('email_queue')
  async handleEmailQueue(@Payload() data: any) {
    console.log('Evento recebido na fila email_queue:', data);
    return await this.rmqProcessService.handleEmailQueue(data);
  }
}
