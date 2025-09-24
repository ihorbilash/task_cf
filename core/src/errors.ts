import { logger } from './logger.js';

export class ErrorsHandler {
  public handleError(error: unknown) {
    logger.error(error);
  }

  public handleProcessErrors() {
    process.on('unhandledRejection', (reason) => {
      this.handleError(reason);
    });
    process.on('uncaughtException', (error) => {
      this.handleError(error);
    });
  }
}
