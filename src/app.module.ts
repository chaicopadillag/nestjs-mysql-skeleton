import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { appEnvironment, appEnvironmentValidate } from './env';
import { ModulesModule } from './modules/modules.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvironment],
      validationSchema: appEnvironmentValidate,
    }),
    DatabaseModule,
    ModulesModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static APP_PORT: number;
  constructor(private readonly env: ConfigService) {
    AppModule.APP_PORT = env.get<number>('PORT');
  }
}
