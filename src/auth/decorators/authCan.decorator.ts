import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HasPermissionGuard } from '../guards/hasPermission.guard';
import { HasPermissions } from './permission.decorator';

export function AuthCan(...permissions: string[]) {
  return applyDecorators(
    HasPermissions(...permissions),
    UseGuards(AuthGuard(), HasPermissionGuard),
  );
}
