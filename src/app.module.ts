/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './Email/email.module';
import { CustomConfigService } from './Common/services/custom.config.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: CustomConfigService) => ({
        throttlers: [
          {
            ttl: parseInt(configService.get<string>('RATE_LIMIT_DURATION') ?? '60', 10),
            limit: parseInt(configService.get<string>('RATE_LIMIT_POINTS') ?? '10', 10),
          },
        ],
        ignoreUserAgents: [/health/i, /internal/i],
      }),
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
