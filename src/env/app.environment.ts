import { registerAs } from '@nestjs/config';

export const appEnvironment = registerAs('appEnvironment', () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  db: {
    TYPE: process.env.DB_TYPE || 'mysql',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT, 10) || 3306,
    USERNAME: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    NAME: process.env.DB_NAME || 'test',
  },
}));
