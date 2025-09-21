import express from 'express';
export type ExpressInstance = express.Express;
export type ExpressRequest = express.Request;
export type ExpressResponse = express.Response;
export type ExpressNextFunction = express.NextFunction;

export function createServer(): ExpressInstance {
  const app = express();
  app.use(express.json());
  return app;
}
