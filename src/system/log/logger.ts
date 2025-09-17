import { Inject, Injectable } from '@nestjs/common';
import { isNumeric } from '../helper';
import { FileHandler } from './handlers/file.handler';
import { ErrorlogHandler } from './handlers/error-log.handler';
import { LoggerConfig } from '@app/config/logger.config';
import { ConfigService } from '@nestjs/config';

const clases = {
  FileHandler,
  ErrorlogHandler,
};

@Injectable()
export class Logger {
  /**
   * Path to save log files to.
   *
   * @var string
   */
  protected logPath;

  /**
   * Used by the logThreshold Config setting to define
   * which errors to show.
   *
   * @var array
   */
  protected logLevels = {
    emergency: 1,
    alert: 2,
    critical: 3,
    error: 4,
    warning: 5,
    notice: 6,
    info: 7,
    debug: 8,
  };

  /**
   * Array of levels to be logged.
   * The rest will be ignored.
   * Set in Config/logger.php
   *
   * @var array
   */
  protected loggableLevels = [];

  /**
   * File permissions
   *
   * @var integer
   */
  protected filePermissions = 0o644;

  /**
   * Format of the timestamp for log files.
   *
   * @var string
   */
  protected dateFormat = 'yyyy-MM-dd HH:mm:ss';

  /**
   * Filename Extension
   *
   * @var string
   */
  protected fileExt;

  /**
   * Caches instances of the handlers.
   *
   * @var array
   */
  protected handlers = [];

  /**
   * Holds the configuration for each handler.
   * The key is the handler's class name. The
   * value is an associative array of configuration
   * items.
   *
   * @var array
   */
  protected handlerConfig = {};

  /**
   * Caches logging calls for debugbar.
   *
   * @var array
   */
  public logCache;

  /**
   * Should we cache our logged items?
   *
   * @var boolean
   */
  protected cacheLogs = false;

  //--------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param  type    config
   * @param  boolean debug
   * @throws \RuntimeException
   */

  constructor(
    @Inject('LOGGER_CONFIG') private readonly config: LoggerConfig,
    @Inject('NESTJS_DEBUG') debug: boolean,
    private readonly dotEnv: ConfigService,
  ) {
    this.loggableLevels = Array.isArray(this.config.threshold)
      ? this.config.threshold
      : Array.from(
          { length: Number(this.config.threshold) },
          (value, index) => index + 1,
        );

    // Now convert loggable levels to strings.
    // We only use numbers to make the threshold setting convenient for users.
    if (this.loggableLevels) {
      const temp = [];
      this.loggableLevels.forEach((level) => {
        temp.push(
          Object.keys(this.logLevels).find(
            (key) => this.logLevels[key] === Number(level),
          ),
        );
      });

      this.loggableLevels = temp;
    }

    this.dateFormat = this.config.dateFormat
      ? this.config.dateFormat
      : this.dateFormat;

    if (
      typeof this.config.handlers != 'object' ||
      Object.keys(this.config.handlers).length === 0
    ) {
      // TODO: throw LogException::forNoHandlers('LoggerConfig');
      throw Error(`forNoHandlers('LoggerConfig')`);
    }

    // Save the handler configuration for later.
    // Instances will be created on demand.
    this.handlerConfig = this.config.handlers;

    this.cacheLogs = debug;
    if (this.cacheLogs) {
      this.logCache = [];
    }
  }

  //--------------------------------------------------------------------

  /**
   * System is unusable.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public emergency(message: string) {
    this.log('emergency', message);
  }

  //--------------------------------------------------------------------

  /**
   * Action must be taken immediately.
   *
   * Example: Entire website down, database unavailable, etc. This should
   * trigger the SMS alerts and wake you up.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public alert(message: string) {
    this.log('alert', message);
  }

  //--------------------------------------------------------------------

  /**
   * Critical conditions.
   *
   * Example: Application component unavailable, unexpected exception.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public critical(message: string) {
    this.log('critical', message);
  }

  //--------------------------------------------------------------------

  /**
   * Runtime errors that do not require immediate action but should typically
   * be logged and monitored.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public error(message: string) {
    this.log('error', message);
  }

  //--------------------------------------------------------------------

  /**
   * Exceptional occurrences that are not errors.
   *
   * Example: Use of deprecated APIs, poor use of an API, undesirable things
   * that are not necessarily wrong.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public warning(message: string) {
    this.log('warning', message);
  }

  //--------------------------------------------------------------------

  /**
   * Normal but significant events.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public notice(message: string) {
    this.log('notice', message);
  }

  //--------------------------------------------------------------------

  /**
   * Interesting events.
   *
   * Example: User logs in, SQL logs.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public info(message: string) {
    this.log('info', message);
  }

  //--------------------------------------------------------------------

  /**
   * Detailed debug information.
   *
   * @param string message
   * @param array  context
   *
   * @return null
   */
  public debug(message: string) {
    this.log('debug', message);
  }

  //--------------------------------------------------------------------

  /**
   * Logs with an arbitrary level.
   *
   * @param mixed  level
   * @param string message
   * @param array  context
   *
   * @return boolean
   */
  public log(level: any, message: string): boolean {
    if (isNumeric(level)) {
      level = Object.keys(this.logLevels).find(
        (key) => this.logLevels[key] === Number(level),
      );
    }

    // Is the level a valid level?
    if (!this.logLevels.hasOwnProperty(level)) {
      //TODO: throw LogException::forInvalidLogLevel($level);
      throw Error(`forInvalidLogLevel(${level})`);
    }

    // Does the app want to log this right now?
    if (!this.loggableLevels.includes(level)) {
      return false;
    }

    // Parse our placeholders
    // message = this.interpolate(message, context);

    if (typeof message != 'string') {
      message = JSON.stringify(message);
    }

    if (this.cacheLogs) {
      this.logCache.push({
        level: level,
        msg: message,
      });
    }

    for (const className in this.handlerConfig) {
      const config = this.handlerConfig[className];
      if (!this.handlers.includes(className)) {
        this.handlers[className] = new clases[className](config, this.dotEnv);
      }

      /**
       * @var \system\log\handlers\handler.interface
       */
      const handler = this.handlers[className];

      if (!handler.canHandle(level)) {
        continue;
      }

      // If the handler returns false, then we
      // don't execute any other handlers.
      if (!handler.setDateFormat(this.dateFormat).handle(level, message)) {
        break;
      }
    }

    return true;
  }
}
