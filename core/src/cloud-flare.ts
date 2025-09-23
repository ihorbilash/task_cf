import Cloudflare from 'cloudflare';
import env, { required } from './server/env.js';

export type { Cloudflare as CloudflareInstance } from 'cloudflare';

const CLOUDFLARE_TOKEN = required(env.CLOUDFLARE_TOKEN);

export const cloudflare = new Cloudflare({
  apiToken: CLOUDFLARE_TOKEN,
});
