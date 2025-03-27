import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { mailController } from './mail.controller';

@Module({
    imports: [], 
    providers: [MailService],
    controllers: [mailController],
  })
  export class MailModule {}