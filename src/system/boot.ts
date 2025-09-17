import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Paths } from '@app/config/paths,config';

@Injectable()
export class Boot {
  constructor(@Inject('APP_PATHS') private readonly paths: Paths) {}

  public bootWeb(): void {
    Boot.definePathConstants(this.paths);
    Boot.defineEnvironment();
  }

  /**
   * The path constants provide convenient access to the folders throughout
   * the application. We have to set them up here, so they are available in
   * the config files that are loaded.
   */
  static definePathConstants(paths: Paths): void {
    // WRITEPATH
    if (!process.env.WRITEPATH) {
      const writePath = path.resolve(paths.writableDirectory);

      if (!fs.existsSync(writePath)) {
        console.error('The WRITEPATH is not set correctly.');
        process.exit(1);
      }

      process.env.WRITEPATH = writePath + path.sep;
    }
  }

  static defineEnvironment(): void {
    if (!process.env.ENVIRONMENT) {
      process.env.ENVIRONMENT = process.env.NODE_ENV ?? 'production';
    }
  }
}
