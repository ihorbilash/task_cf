import { bot, TelegrafInstance } from '@monorepo/core/src/bot.js';
import { CloudFlareService, cloudFlareService } from './cloud-flare.service.js';
import { logger } from '@monorepo/core/src/logger.js';
import env, { required } from '@monorepo/core/src/server/env.js';
import { userRepository, UserRepository } from '#entities/user/user.repository.js';

const ALLOWED_CHAT_ID = Number(required(env.TELEGRAM_CHAT_ID));

const ALLOWED_TYPES: string[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

export class TelegramBotService {
  constructor(
    private bot: TelegrafInstance,
    private userRepository: UserRepository,
    private cloudflareService: CloudFlareService,
  ) {
    this.registerCommands();
    this.bot.catch((err) => {
      logger.error({ err }, 'Unhandled Telegram error');
    });
    this.bot.launch();
    logger.info('Telegram bot started...');
  }

  // here is all necessary commands
  private registerCommands() {
    // Help command
    this.bot.command('help', (ctx) => {
      if (!this.isAllowedChat(ctx)) return;
      ctx.reply(
        [
          'Allowed commands:\n',
          '/chatInfo',
          '   ➝ Get information about the current chat.',
          '/askPermission',
          '   ➝ Request access to use the bot (sends your chat and user info).',
          '/help',
          '   ➝ Show this help message.\n',
          '/registerDomain <domain>',
          '   ➝ Register a new domain in Cloudflare. Example: /registerDomain mydomain.com\n',
          `/addRecord <zoneId> <type> <name> <value>`,
          `   ➝ Add a DNS record. type: ${this.formatAllowedTypes()}`,
          '   name: subdomain or @ for root (e.g. www)',
          '   value: IP address or target value (e.g. 192.168.0.1)',
          '   Example: /addRecord <zoneId> A www 192.168.0.1\n',
          '/updateRecord <zoneId> <recordId> <newValue>',
          '   ➝ Update an existing DNS record. Example: /updateRecord <zoneId> 123456789 203.0.113.10\n',
          '/deleteRecord <zoneId> <recordId>',
          '   ➝ Delete a DNS record. Example: /deleteRecord <zoneId> 123456789',
        ].join('\n'),
      );
    });

    // Register domain command
    this.bot.command('registerDomain', async (ctx) => {
      if (!this.isAllowedChat(ctx)) return;
      const text = ctx.message.text;
      const args = this.parseArgs(text);
      if (args.length !== 1) {
        ctx.reply('Usage: /registerDomain <domain>');
        return;
      }
      const [domain] = args;
      try {
        const zone = await this.cloudflareService.registerDomain(domain);
        ctx.reply(`Domain ${domain} registered successfully. \n Additional info: ${JSON.stringify(zone)}`);
      } catch (error: any) {
        logger.error({ error }, 'Failed to register domain');
        ctx.reply(`Failed to register domain: ${error.message || 'unknown error'}`);
      }
    });

    // Add DNS record command
    this.bot.command('addRecord', async (ctx) => {
      if (!this.isAllowedChat(ctx)) return;
      const text = ctx.message.text;
      const args = this.parseArgs(text);
      if (args.length !== 4) {
        ctx.reply('Usage: /addRecord <zoneId> <type> <name> <value>');
        return;
      }
      const [zone_id, typeRaw, name, value] = args;
      const type = String(typeRaw).toUpperCase();
      if (!this.isAllowedType(type)) {
        ctx.reply(`Only ${this.formatAllowedTypes()} record types are supported.`);
        return;
      }
      try {
        await this.cloudflareService.addRecord({ zone_id, type, name, value } as any);
        ctx.reply(`Record added successfully: ${type} ${name} ${value}`);
      } catch (error: any) {
        logger.error({ error }, 'Failed to add record');
        ctx.reply(`Failed to add record: ${error?.message || 'unknown error'}`);
      }
    });

    // Update DNS record command
    this.bot.command('updateRecord', async (ctx) => {
      if (!this.isAllowedChat(ctx)) return;
      const text = ctx.message.text;
      const args = this.parseArgs(text);
      if (args.length !== 3) {
        ctx.reply('Usage: /updateRecord <zoneId> <recordId> <newValue>');
        return;
      }
      const [zoneId, recordId, newValue] = args;
      try {
        await this.cloudflareService.editDomain(zoneId, { id: recordId, content: newValue } as any);
        ctx.reply(`Record ${recordId} updated successfully.`);
      } catch (error: any) {
        logger.error({ error }, 'Failed to update record');
        ctx.reply(`Failed to update record: ${error?.message || 'unknown error'}`);
      }
    });

    // Delete DNS record command
    this.bot.command('deleteRecord', async (ctx) => {
      if (!this.isAllowedChat(ctx)) return;
      const text = ctx.message.text;
      const args = this.parseArgs(text);
      if (args.length !== 2) {
        ctx.reply('Usage: /deleteRecord <zoneId> <recordId>');
        return;
      }
      const [zoneId, recordId] = args;
      try {
        await this.cloudflareService.deleteRecordById(recordId, zoneId);
        ctx.reply(`Record ${recordId} deleted successfully.`);
      } catch (error: any) {
        logger.error({ error }, 'Failed to delete record');
        ctx.reply(`Failed to delete record: ${error?.message || 'unknown error'}`);
      }
    });

    // Request Access permission (added user to DB with allowed=false)
    this.bot.command('askPermission', async (ctx) => {
      const from = ctx.from;
      const existingUser = await this.userRepository.findOne({
        telegramId: from.id,
      });

      if (existingUser) {
        ctx.reply(`You have already sent a request. Please wait for admin review.`);
        return;
      }

      await this.userRepository.create({
        username: from.username || '',
        telegramId: from.id,
        allowed: false,
      });
      ctx.reply(`Request sent successfully. Admin will review your request soon.`);
    });

    // Handle chat info
    this.bot.command('chatInfo', (ctx) => {
      const chatId = ctx.chat?.id;
      const from = ctx.from;
      const chat = ctx.chat;

      ctx.reply(
        `Chat ID: ${chatId}\n\n` +
          `User Info: ${JSON.stringify(from, null, 2)}\n\n` +
          `Chat Info: ${JSON.stringify(chat, null, 2)}`,
      );
    });
  }

  private isAllowedChat(ctx: any): boolean {
    const chatId = ctx.chat?.id;
    if (chatId !== ALLOWED_CHAT_ID) {
      ctx.reply('You are not allowed to use this bot.');
      return false;
    }
    return true;
  }

  private isAllowedUser(ctx: any, telegramIds: number[]): boolean {
    const userId = ctx.from?.id;
    if (!telegramIds.includes(userId)) {
      ctx.reply('You are not allowed to use this bot.');
      return false;
    }
    return true;
  }

  private parseArgs(text: string): string[] {
    return text.trim().split(/\s+/).slice(1);
  }

  private isAllowedType(type: string): boolean {
    return ALLOWED_TYPES.includes(String(type).toUpperCase());
  }

  private formatAllowedTypes(): string {
    return ALLOWED_TYPES.join(', ');
  }
}

export const telegramBotService = new TelegramBotService(bot, userRepository, cloudFlareService);
