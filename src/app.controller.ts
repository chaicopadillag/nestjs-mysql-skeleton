import { Controller, Delete, Get, Req } from '@nestjs/common';
import { Csrf } from 'ncsrf';

import { AppService } from './app.service';
import { AuthCan, IsPublic } from './auth/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Csrf()
  @AuthCan('delete')
  @Delete('delete-user')
  delete() {
    return {
      message: 'delete success full',
    };
  }

  @Get('/token-csrf')
  getCsrfToken(@Req() req): any {
    return {
      token: req.csrfToken(),
    };
  }
}
