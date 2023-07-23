import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as config from './config';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';
import { MenuMainScene } from './scenes/menu-main.scene';
import { BookMenuScene } from './scenes/book-menu.screne';

@Module({
  imports: [
    ConfigModule.forRoot(config.getEnvConfig()),
    TelegrafModule.forRootAsync(config.telegramAsyncOptions()),
  ],
  controllers: [],
  providers: [AppService, AppUpdate, MenuMainScene, BookMenuScene],
})
export class AppModule {}
