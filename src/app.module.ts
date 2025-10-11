/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './Email/email.module';
import { CustomConfigService } from './Common/services/custom.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: CustomConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MailModule,
  ],
  providers: [],
})
export class AppModule {}
