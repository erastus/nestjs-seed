import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Logger } from './log/logger';
import { Boot } from './boot';
import { ConfigService } from '@nestjs/config';
import { Paths } from '@app/config/paths,config';
import { ConfigDefinition } from './interfaces/config-definition.interface';
import { BaseConfig } from './config/base.config';

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

    const bootProvider: Provider = {
      provide: Boot,
      inject: ['APP_PATHS'],
      useFactory: (paths: Paths) => {
        const boot = new Boot(paths);
        boot.bootWeb();
        return boot;
      },
    };

    const configDefs: ConfigDefinition[] = [
      { token: 'LOGGER_CONFIG', clazz: options.loggerConfig },
    ];

    const configProvider = (configDefs: ConfigDefinition[]): Provider[] => {
      return configDefs.map((def) => ({
        provide: def.token,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const clazz: BaseConfig = new def.clazz(configService);
          clazz.overrideWithEnv();
          return clazz;
        },
      }));
    };

    return {
      module: SystemModule,
      providers: [
        ...configProvider(configDefs),
        {
          provide: 'APP_PATHS',
          useValue: options.paths,
        },
        {
          provide: 'NESTJS_DEBUG',
          useValue: String(process.env.NESTJS_DEBUG).toLowerCase() == 'true',
        },
        bootProvider,
        Logger,
      ],
      imports: [],
      exports: [Boot, Logger],
    };
  }
}
