import { HandlerInterface } from './handler.interface';

export abstract class BaseHandler implements HandlerInterface {
  /**
   * Handles
   *
   * @var array
   */
  protected handles;

  /**
   * Date format for logging
   *
   * @var string
   */
  protected dateFormat = 'yyyy-MM-dd HH:mm:ss';

  /**
   * context
   *
   * @var string
   */
  protected context = '';

  //--------------------------------------------------------------------

  /**
   * Constructor
   *
   * @param object config
   */
  constructor(config: object) {
    this.handles = config['handles'] ?? [];
  }

  //--------------------------------------------------------------------

  /**
   * Checks whether the Handler will handle logging items of this
   * log Level.
   *
   * @param level
   *
   * @return boolean
   */
  canHandle(level: string): boolean {
    return this.handles.includes(level);
  }

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
  abstract handle(level: any, message: any): boolean;

  //--------------------------------------------------------------------

  /**
   * Stores the date format to use while logging messages.
   *
   * @param string $format
   *
   * @return HandlerInterface
   */
  setDateFormat(format: string): HandlerInterface {
    this.dateFormat = format;

    return this;
  }
}
