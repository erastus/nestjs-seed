import { Logger } from '@nestjs/common';
import { BaseHandler } from './base.handler';
import { HandlerInterface } from './handler.interface';

export class ErrorlogHandler extends BaseHandler implements HandlerInterface {
  /**
   * Maps the log levels to the ChromeLogger types.
   *
   * @var array
   */
  protected levels = {
    emergency: 'fatal',
    alert: 'fatal',
    critical: 'fatal',
    error: 'error',
    warning: 'warn',
    notice: 'verbose',
    info: 'log',
    debug: 'debug',
  };

  //--------------------------------------------------------------------

  /**
   * Constructor
   *
   * @param object config
   */
  constructor(config: object) {
    super(config);
  }

  handle(level: any, message: any): boolean {
    // Default to 'log' type.
    let messageType = '';

    if (this.levels.hasOwnProperty(level)) {
      messageType = this.levels[level];
    }

    this.logger(message, messageType);

    return true;
  }

  /**
   * Extracted call to `new Logger()` in order to be tested.
   *
   * @codeCoverageIgnore
   */
  protected logger(message: string, messageType): boolean {
    const logger = new Logger(this.getCallerClass());
    logger[messageType](message);

    return true;
  }

  getCallerClass(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknownClass';

    const lines = stack.split('\n').slice(2); // saltamos Error y esta función

    const skipPatterns = [
      '/system/log/',
      'error-log.handler',
      'logger.ts',
      'handlerfactory',
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (!skipPatterns.some((p) => lowerLine.includes(p))) {
        const match = line.match(/\s+at (.+) \((.+):(\d+):(\d+)\)/);
        if (match) {
          const methodFull = match[1]; // Ej: HealthController.run
          const className = methodFull.split('.')[0]; // Tomamos solo la clase
          return className;
        }
      }
    }

    return 'unknownClass';
  }
}
