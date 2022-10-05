const typeOrmSeedConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'nestjs_skeleton',
  password: 'root',
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
  extra: {
    charset: 'utf8_general_ci',
  },
  logging: true,
};

export default typeOrmSeedConfig;
