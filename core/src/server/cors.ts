import cors from 'cors';
import env, { required } from './env.js';
import { ExpressInstance } from '@monorepo/core/src/server/api-server.js';

const CORS_ORIGIN = required(env.CORS_ORIGIN);
const SITE_URL = required(env.SITE_URL);

export function registerCors(app: ExpressInstance) {
  app.use(
    cors({
      origin: env.NODE_ENV === 'production' ? CORS_ORIGIN.split(',') : SITE_URL,
      credentials: true,
    }),
  );
}
