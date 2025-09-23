import { bot, TelegrafInstance } from '@monorepo/core/src/bot.js';

class TelegramBotService {
  constructor(private bot: TelegrafInstance) {}

  public async sendMessage(chatId: string, text: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
export const telegramBotService = new TelegramBotService(bot);
