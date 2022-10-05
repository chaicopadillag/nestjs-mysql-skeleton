import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

import { GetAuthUser, GetRawHeader } from './decorators';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@GetAuthUser() user, @GetRawHeader() headers) {
    return {
      user,
      headers,
    };
  }
}
