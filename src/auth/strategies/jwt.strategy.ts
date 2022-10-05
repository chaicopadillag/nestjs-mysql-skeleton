import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appEnvironment } from 'src/env';
import { AuthService } from '../auth.service';
import { JwtPayloadType } from '../types/authTypes';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(appEnvironment.KEY)
    private readonly env: ConfigType<typeof appEnvironment>,
    private readonly authServ: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwt.SECRET,
    });
  }

  async validate(payload: JwtPayloadType) {
    const { id } = payload;

    const user = await this.authServ.getAuthUser(id);

    if (!user) throw new UnauthorizedException('Unauthorized');

    return user;
  }
}
