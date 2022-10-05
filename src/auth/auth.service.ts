import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadType, AuthUserType } from './types/authTypes';

@Injectable()
export class AuthService {
  private users: AuthUserType[] = [];

  constructor(private jwtService: JwtService) {
    this.users.push({
      id: 1,
      name: 'Code Dev',
      email: '******',
      password: '******',
      permissions: ['read', 'create', 'update', 'delete'],
    });
  }

  async login(credentials: LoginDto) {
    const user = this.users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: JwtPayloadType = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAuthUser(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
