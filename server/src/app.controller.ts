import { Body, Controller, Get, Post, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  getPing(): string {
    return 'pong';
  }
}
