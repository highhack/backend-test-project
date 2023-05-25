import {
  UserData,
  usersRepository,
} from "../repositories/users/users-repository-db";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

export interface User {
  login: string;
  email: string;
  password: string;
}

export const usersService = {
  async createUser(
    login: string,
    email: string,
    password: string
  ): Promise<UserData> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const newUser = {
      _id: new ObjectId(),
      userName: login,
      email,
      passwordSalt,
      passwordHash,
      createdAt: new Date(),
    };

    return usersRepository.createUser(newUser);
  },

  async _generateHash(password: string, salt: string): Promise<string> {
    const hash = bcrypt.hash(password, salt);
    return hash;
  },
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    const passwordHash = await this._generateHash(password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) return false;
    return true;
  },
};
