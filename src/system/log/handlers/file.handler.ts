import { BaseHandler } from './base.handler';
import { HandlerInterface } from './handler.interface';
import { date } from '../../helper/date.helper';
import * as fs from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export class FileHandler extends BaseHandler implements HandlerInterface {
  /**
   * Folder to hold logs
   *
   * @var string
   */
  protected path;

  /**
   * Extension to use for log files
   *
   * @var string
   */
  protected fileExtension;

  /**
   * Permissions for new log files
   *
   * @var integer
   */
  protected filePermissions;

  //--------------------------------------------------------------------

  /**
   * Constructor
   *
   * @param object config
   */
  constructor(
    config: object,
    private readonly dotEnv: ConfigService,
  ) {
    super(config);

    this.path =
      config['path'] !== ''
        ? config['path']
        : join(this.dotEnv.get('WRITEPATH'), 'logs');

    this.fileExtension =
      config['fileExtension'] !== '' ? config['fileExtension'] : 'log';
    this.fileExtension = this.fileExtension.replace('.', '');

    this.filePermissions =
      config['filePermissions'] !== '' ? config['filePermissions'] : 0o644;
  }

  //--------------------------------------------------------------------

  /**
   * Handles logging the message.
   * If the handler returns false, then execution of handlers
   * will stop. Any handlers that have not run, yet, will not
   * be run.
   *
   * @param level
   * @param message
   *
   * @return boolean
   */

  handle(level: string, message: any): boolean {
    const filepath = join(
      this.path,
      `log-${date('yyyy-MM-dd')}.${this.fileExtension}`,
    );
    const caller = this.getOriginalCaller();

    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, '', { mode: this.filePermissions });
    }

    const currentDate = date(this.dateFormat);

    const msg = `${level.toUpperCase()} - ${currentDate} --> [${this.getCallerClass()}] - ${caller} - ${message}\n`;

    fs.appendFileSync(filepath, msg);

    return true;
  }

  getOriginalCaller(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknown.Unknown.unknown';

    const lines = stack.split('\n').slice(2);

    const skipPatterns = [
      '/system/log/',
      'file.handler',
      'logger.ts',
      'handlerfactory',
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (!skipPatterns.some((p) => lowerLine.includes(p))) {
        const match = line.match(/\s+at (.+) \((.+):(\d+):(\d+)\)/);
        if (match) {
          const method = match[1];
          const filePath = match[2]; // <-- ruta completa
          const lineNumber = match[3];
          return `${filePath}.${method}(${lineNumber})`;
        }
      }
    }

    return 'unknown.Unknown.unknown';
  }

  getOriginalMethod(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknownMethod';

    const lines = stack.split('\n').slice(2);

    const skipPatterns = [
      '/system/log/',
      'file.handler',
      'logger.ts',
      'handlerfactory',
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (!skipPatterns.some((p) => lowerLine.includes(p))) {
        const match = line.match(/\s+at (.+) \((.+):(\d+):(\d+)\)/);
        if (match) {
          const method = match[1];
          return method;
        }
      }
    }

    return 'unknownMethod';
  }

  getCallerClass(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknownClass';

    const lines = stack.split('\n').slice(2);

    const skipPatterns = [
      '/system/log/',
      'file.handler',
      'logger.ts',
      'handlerfactory',
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (!skipPatterns.some((p) => lowerLine.includes(p))) {
        const match = line.match(/\s+at (.+) \((.+):(\d+):(\d+)\)/);
        if (match) {
          const methodFull = match[1];
          const className = methodFull.split('.')[0];
          return className;
        }
      }
    }

    return 'unknownClass';
  }
}
