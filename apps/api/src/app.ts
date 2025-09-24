import env, { required } from '@monorepo/core/src/server/env.js';
import { logger } from '@monorepo/core/src/logger.js';

import { createServer } from '@monorepo/core/src/server/api-server.js';
import { registerCors } from '@monorepo/core/src/server/cors.js';
import { registerHelmet } from '@monorepo/core/src/helmet.js';
import { registerErrorHandler } from '@monorepo/core/src/server/errors.js';
import { ErrorsHandler } from '@monorepo/core/src/errors.js';
import { registerRoutes } from '@monorepo/core/src/server/routes.js';
import { registerMorgan } from '@monorepo/core/src/morgan.js';

import { connectToDB } from '@monorepo/core/src/db/mongo.js';

import { buildApiRoutes } from './routes/index.js';

const errorsHandler = new ErrorsHandler();
errorsHandler.handleProcessErrors();

// Initialize bot service
import '@monorepo/common/src/services/telegram-bot.service.js';

const API_PORT = Number(required(env.API_PORT));

const main = async () => {
  await connectToDB();

  const app = createServer();

  registerCors(app);
  registerHelmet(app);
  registerMorgan(app, 'dev');
  registerRoutes(app, buildApiRoutes());
  registerErrorHandler(app);

  app.listen(API_PORT, () => {
    logger.info(`Server is running on port ${API_PORT}`);
  });
};

await main();
