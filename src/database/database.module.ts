import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appEnvironment } from 'src/env/app.environment';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [appEnvironment.KEY],
      useFactory: async (env: ConfigType<typeof appEnvironment>) => {
        return {
          type: env.db.TYPE as 'mysql' | 'postgres',
          host: env.db.HOST,
          port: env.db.PORT,
          username: env.db.USERNAME,
          password: env.db.PASSWORD,
          database: env.db.NAME,
          entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: __dirname + '/migrations',
          },
          extra: {
            charset: 'utf8_general_ci',
          },
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
