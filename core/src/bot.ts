import { Telegraf } from 'telegraf';

export type { Telegraf as TelegrafInstance } from 'telegraf';

import env, { required } from './server/env.js';

const TELEGRAM_BOT_TOKEN = required(env.TELEGRAM_BOT_TOKEN);

export const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
