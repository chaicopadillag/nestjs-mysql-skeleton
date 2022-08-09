import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql' | 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  //   cli: {
  //     migrationsDir: __dirname + '/migrations',
  //   },

  extra: {
    charset: 'utf8_general_ci',
  },
  logging: true,
};

export default typeOrmConfig;
