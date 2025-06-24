import { Injectable } from "@nestjs/common";
import { executeQuery } from "src/db/dbConnection";

@Injectable()
export class UsersService {
  constructor() {}

  async addUser(userId: string) {
    return executeQuery("INSERT INTO user_preference.users(id) VALUES ($1)", [
      userId,
    ]);
  }
}
