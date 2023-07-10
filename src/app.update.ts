import { UseFilters } from '@nestjs/common';
import {
  Command,
  Ctx,
  Hears,
  Help,
  InjectBot,
  Message,
  On,
  Sender,
  Start,
  TELEGRAF_BOT_NAME,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'src/common/interfaces/context.interface';
import { Telegraf } from 'telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { AppService } from './app.service';
import { TelegrafExceptionFilter } from 'src/common/filters/telegraf-exception.filter';
import { MENU_BOOK, MENU_MAIN } from './common/common.constants';
import { UpdateType } from './common/decorators/update-type.decorator';
import { ReverseTextPipe } from './pipes/reverse-text.pipe';

@Update()
//@UseInterceptors(StoreUserInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class AppUpdate {
  constructor(
    @InjectBot(TELEGRAF_BOT_NAME) private readonly bot: Telegraf<Context>,
    private readonly botService: AppService,
  ) {}

  @Command('book')
  async onBookCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(MENU_BOOK)
  }

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    console.log(ctx.scene);
    //console.log(ctx.message)
    await ctx.scene.enter(MENU_MAIN);
    //await ctx.replyWithSticker('123123jkbhj6b');
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    /*     console.log('***')
      console.log(updateType); */
    return `Hey hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    const me = await this.bot.telegram.getMe();
    //console.log('command scene ' + me.username)
    //console.log(ctx.scene);
    //console.log(this.bot.context.scene);
    await ctx.scene.enter(MENU_MAIN);
  }

  @On('text')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string,
  ): string {
    //console.log('text and echo')
    return this.botService.echo(reversedText);
  }
}
