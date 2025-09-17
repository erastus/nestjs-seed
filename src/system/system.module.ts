import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Logger } from './log/logger';
import { Boot } from './boot';
import { ConfigService } from '@nestjs/config';

interface SystemModuleOptions {
  loggerConfig: any;
  paths: any;
  databaseConfig: any;
}

@Global()
@Module({})
export class SystemModule {
  private static isInitialized = false;
  static forRoot(options: SystemModuleOptions): DynamicModule {
    if (SystemModule.isInitialized) {
      throw new Error('SystemModuleCreated.forRoot imported to many time');
    }

    SystemModule.isInitialized = true;

    const loggerProvider: Provider = {
      provide: 'LOGGER_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new options.loggerConfig(configService);
      },
    };

    return {
      module: SystemModule,
      providers: [
        loggerProvider,
        {
          provide: 'APP_PATHS',
          useValue: options.paths,
        },
        {
          provide: 'NESTJS_DEBUG',
          useValue: String(process.env.NESTJS_DEBUG).toLowerCase() == 'true',
        },
        Boot,
        Logger,
      ],
      imports: [],
      exports: [Logger],
    };
  }
}
