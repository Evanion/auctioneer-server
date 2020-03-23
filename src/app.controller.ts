import { Controller, Get, Inject, Redirect, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Inject() private readonly appService: AppService;

  @Get()
  @Redirect('/graphql', HttpStatus.PERMANENT_REDIRECT)
  getHello(): string {
    return this.appService.getHello();
  }
}
