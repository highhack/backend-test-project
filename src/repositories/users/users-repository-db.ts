import { ObjectId } from "mongodb";
import { usersCollection } from "../db";

export interface UserData {
  _id: ObjectId;
  userName: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  createdAt: Date;
}

export const usersRepository = {
  async createUser(user: UserData): Promise<UserData> {
    const result = await usersCollection.insertOne(user);
    return user;
  },
  async findByLoginOrEmail(loginOrEmail: string): Promise<UserData | null> {
    const user = await usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { userName: loginOrEmail }],
    });
    return user;
  },
};
