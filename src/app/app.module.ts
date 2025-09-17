import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SystemModule } from '@system/system.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Paths } from './config/paths,config';
import { LoggerConfig } from './config/logger.config';
import { Database } from './config/database.config';
import { HealthModule } from './features/health/health.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
    }),
    SystemModule.forRoot({
      loggerConfig: LoggerConfig,
      paths: new Paths(),
      databaseConfig: new Database(),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(process.cwd(), 'public'),
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
