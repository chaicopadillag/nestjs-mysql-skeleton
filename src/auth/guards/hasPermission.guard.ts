import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HAS_PERMISSIONS_KEY } from '../decorators';
import { AuthUserType } from '../types/authTypes';

@Injectable()
export class HasPermissionGuard implements CanActivate {
  constructor(private refletor: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permisions = this.refletor.get<string>(
      HAS_PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (permisions.length <= 0) return false;

    const request = context.switchToHttp().getRequest();

    const user = request.user as AuthUserType;

    if (!user) throw new ForbiddenException('Usuario no autorizado');

    const hasPermission = user.permissions.some((perm) =>
      permisions.includes(perm),
    );
    if (!hasPermission) throw new ForbiddenException('Permiso no autorizado');

    return hasPermission;
  }
}
