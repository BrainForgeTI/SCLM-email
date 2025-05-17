import { Inject, Injectable } from '@nestjs/common';
import {
  logType,
  SendRmqMessageInputPort,
} from '../ports/in/send.rmb.message.input.port';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class SendRmqMessageUsecase implements SendRmqMessageInputPort {
  constructor(
    @Inject('SAVE_LOG_QUEUE')
    private readonly rabbitClient: ClientRMQ,
  ) {}
  send(log: logType): void {
    this.rabbitClient.emit('save_log_queue', log);
  }
}
