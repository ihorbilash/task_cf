import { mongoose } from '@monorepo/core/src/db/mongo.js';
import { UserData, UserDbModel, UserDbDocument } from './model.js';

export class UserRepository {
  create(data: UserData) {
    return UserDbModel.create(data);
  }

  findOne(filter: mongoose.FilterQuery<UserData>) {
    return UserDbModel.findOne(filter);
  }

  findAll(filter: mongoose.FilterQuery<UserData>) {
    return UserDbModel.find(filter);
  }

  updateOne(filter: mongoose.FilterQuery<UserDbDocument>, data: mongoose.UpdateQuery<UserData>) {
    return UserDbModel.updateOne(filter, data);
  }
}

export const userRepository = new UserRepository();
