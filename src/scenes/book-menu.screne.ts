import {
  Action,
  Command,
  Ctx,
  Hears,
  Scene,
  SceneEnter,
  SceneLeave,
  Sender,
} from 'nestjs-telegraf';
import { Context } from 'src/common/interfaces/context.interface';
import {
  InlineKeyboardButton,
  Update,
} from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { MENU_BOOK } from 'src/common/common.constants';
import { CHAPTER_01 } from 'src/data/chapter01';
import { Input } from 'telegraf';

const inlineKeyboard: InlineKeyboardButton[][] = [
  [{ text: 'Слова', callback_data: 'words' }],
  [
    { text: 'yandex п.', callback_data: 'yandexTranslate' },
    { text: 'Авторский п.', callback_data: 'authorText' },
  ],
];

@Scene(MENU_BOOK)
export class BookMenuScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    ctx.reply('The Silo');
  }

  @SceneLeave()
  onSceneLeave(): void {
    console.log('User leave the BOOK_MENU');
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }

  @Command(['text'])
  async onText(ctx: Context) {
    await ctx.replyWithVoice(Input.fromLocalFile('src/data/ch01_1.ogg'));
    await ctx.reply(CHAPTER_01.engText, {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
    //await ctx.replyWithVoice({ source: 'src/data/test2.mp3'})
   //await ctx.sendPhoto(Input.fromLocalFile('src/data/img.jpg'));
    // await ctx.(Input.fromLocalFile('src/data/ch01_1.ogg'), {
    //   caption: CHAPTER_01.engText,
    //   reply_markup: { inline_keyboard: inlineKeyboard },
    //   thumb: Input.fromLocalFile('src/data/img.jpg')
    // });
   //ctx.sendAudio(Input.fromLocalFile('src/data/test1.mp3'));
  }

  @Action(/words|yandex|author/)
  async onAnswer(
    @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const cbQuery = context.update.callback_query;
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;
    const text = userAnswer ? CHAPTER_01[userAnswer] : '';

    await context.editMessageText(CHAPTER_01.engText + text, {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
  }
}
