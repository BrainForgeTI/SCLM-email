export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  WARN = 'WARN',
  LOG = 'LOG',
}

export type logType = {
  level: LOG_LEVEL;
  user?: string;
  message: string;
  date: Date;
  module: string;
  operation: string;
};

export interface SendRmqMessageInputPort {
  send(log: logType): void;
}
