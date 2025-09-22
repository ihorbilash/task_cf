import { Schema, mongoose } from '@monorepo/core/src/db/mongo.js';
import { JSONSchemaType } from '@monorepo/core/src/validation.js';

export type UserData = {
  createdAt?: Date;
  updatedAt?: Date;
  username: string;
  telegramId: string;
};

export type UserValidation = Pick<UserData, 'username' | 'telegramId'>;

export interface UserDbDocument
  extends UserData,
    mongoose.Document<mongoose.Types.ObjectId, Record<string, never>, UserData> {}

export const userValidationSchema: JSONSchemaType<UserValidation> = {
  type: 'object',
  required: ['username', 'telegramId'],
  properties: {
    username: { type: 'string' },
    telegramId: { type: 'string' },
  },
};

export const userDbSchema = new Schema<UserDbDocument>(
  {
    username: { type: String, required: true, index: true },
    telegramId: { type: String },
  },
  { timestamps: true },
);

export const UserDbModel = mongoose.model<UserDbDocument>('UserDbModel', userDbSchema);
