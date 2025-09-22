import * as mongoose from 'mongoose';
import env, { required } from '@monorepo/core/src/server/env.js';
import { logger } from '@monorepo/core/src/logger.js';

export * from 'mongoose';
export * as mongoose from 'mongoose';

export type ConnectionOptions = { uri?: string; test?: boolean };
const MONGO_URL = required(env.MONGO_URL);
export const DbConnections = new Map<string, mongoose.Connection>();

export async function connectToDB(options?: ConnectionOptions): Promise<mongoose.Connection> {
  let connection: mongoose.Connection;
  let uri: string;
  if (options?.uri) {
    uri = options.uri;
  } else {
    uri = MONGO_URL;
  }
  const isDefaultConnection = uri === MONGO_URL;
  if (options?.test) uri += '__test';

  if (isDefaultConnection) {
    const _mongoose = await mongoose.connect(uri);
    connection = _mongoose.connection;
    DbConnections.set(uri, connection);
  } else {
    connection = mongoose.createConnection(uri);
    DbConnections.set(uri, connection);
  }
  logger.info(`Connected to DB: ${connection.host}`);
  return connection;
}
