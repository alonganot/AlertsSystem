import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Query("user_id") userId: string) {
    if (!userId) {
      throw new BadRequestException("No user_id provided");
    }
    return this.usersService.addUser(userId);
  }
}
