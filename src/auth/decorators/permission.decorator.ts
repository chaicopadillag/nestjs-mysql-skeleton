import { SetMetadata } from '@nestjs/common';

export const HAS_PERMISSIONS_KEY = 'HAS_PERMISSIONS';
export const HasPermissions = (...args: string[]) =>
  SetMetadata(HAS_PERMISSIONS_KEY, args);
