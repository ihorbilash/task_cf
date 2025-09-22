// import userRoutes from "./routes/user.js";
// import authRoutes from "./routes/auth.js";
import { createServer } from '@monorepo/core/src/server/api-server.js';
import { registerCors } from '@monorepo/core/src/server/cors.js';
import { registerHelmet } from '@monorepo/core/src/helmet.js';
import { registerErrorHandler } from '@monorepo/core/src/server/errors.js';
// import { registerRoutes } from './routes/index.js';
import env, { required } from '@monorepo/core/src/server/env.js';
import { logger } from '@monorepo/core/src/logger.js';
import { connectToDB } from '@monorepo/core/src/db/mongo.js';

const API_PORT = Number(required(env.API_PORT));

const main = async () => {
  await connectToDB();
  const app = createServer();
  registerCors(app);
  registerHelmet(app);
  //   registerRoutes(app);
  registerErrorHandler(app);
  app.listen(API_PORT, () => {
    logger.info(`Server is running on port ${API_PORT}`);
  });
};

await main();
