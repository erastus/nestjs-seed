export interface HandlerInterface {
  //get<T>( url: string ): Promise<T>;

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
  handle(level, message): boolean;

  //--------------------------------------------------------------------

  /**
   * Checks whether the Handler will handle logging items of this
   * log Level.
   *
   * @param string $level
   *
   * @return boolean
   */
  canHandle(level: string): boolean;

  //--------------------------------------------------------------------

  /**
   * Sets the preferred date format to use when logging.
   *
   * @param string $format
   *
   * @return HandlerInterface
   */
  setDateFormat(format: string);

  //--------------------------------------------------------------------
}
