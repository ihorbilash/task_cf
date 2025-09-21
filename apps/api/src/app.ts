// import userRoutes from "./routes/user.js";
// import authRoutes from "./routes/auth.js";
import { createServer } from '@monorepo/core/src/api-server.js';
import { registerCors } from '@monorepo/core/src/cors.js';
import { registerHelmet } from '@monorepo/core/src/helmet.js';
import { registerErrorHandler } from '@monorepo/core/src/errors.js';
// import { registerRoutes } from './routes/index.js';
import env, { required } from '@monorepo/core/src/env.js';
// import { connectToDb } from './db.js';

const API_PORT = Number(required(env.API_PORT));

const main = async () => {
  //   await connectToDb();
  const app = createServer();
  registerCors(app);
  registerHelmet(app);
  //   registerRoutes(app);
  registerErrorHandler(app);
  app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
  });
};

await main();
