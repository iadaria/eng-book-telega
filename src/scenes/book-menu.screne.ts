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
import { Update } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { MENU_BOOK } from 'src/common/common.constants';
import { CHAPTER_01 } from 'src/data/chapter01';

@Scene(MENU_BOOK)
export class BookMenuScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context) {
    ctx.reply(CHAPTER_01.text);
  }

  @SceneLeave()
  onSceneLeave(): void {
    console.log('User leave the BOOK_MENU');
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }
}
