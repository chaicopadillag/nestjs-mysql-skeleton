import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

import { GetAuthUser, GetRawHeader, IsPublic } from './decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
