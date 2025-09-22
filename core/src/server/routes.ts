import { ExpressInstance, ExpressRoute } from './api-server.js';

export function registerRoutes(app: ExpressInstance, routes: ExpressRoute[]): void {
  routes.forEach((route) => {
    app.use(route);
  });
}
