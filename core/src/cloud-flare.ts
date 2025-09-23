import Cloudflare from 'cloudflare';
import env, { required } from './server/env.js';

export type { Cloudflare as CloudflareInstance } from 'cloudflare';
export type Zone = Cloudflare.Zones.Zone;
export type ZoneEditParams = Cloudflare.Zones.ZoneEditParams;
export type RequestOptions = Cloudflare.RequestOptions;
export type RecordEditParams = Cloudflare.DNS.RecordEditParams;
export type RecordCreateParams = Cloudflare.DNS.RecordCreateParams;

const CLOUDFLARE_TOKEN = required(env.CLOUDFLARE_TOKEN);

export const cloudflare = new Cloudflare({
  apiToken: CLOUDFLARE_TOKEN,
});
