import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as configs from './configs';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    ConfigModule.forRoot(configs.getEnvConfig()),
    TelegrafModule.forRootAsync(configs.telegramAsyncOptions()),
  ],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
