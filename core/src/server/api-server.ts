import express, { Router } from 'express';
export type ExpressInstance = express.Express;
export type ExpressRequest = express.Request;
export type ExpressRoute = express.Router;
export type ExpressResponse = express.Response;
export type ExpressNextFunction = express.NextFunction;
export const router = Router();

export function createServer(): ExpressInstance {
  const app = express();
  app.use(express.json());
  return app;
}
