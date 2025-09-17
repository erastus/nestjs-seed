import { Injectable } from '@nestjs/common';
import { join } from 'path';

/**
 * Holds the paths that are used by the system to
 * locate the main directories, system, writable, etc.
 * Modifying these allows you to re-structure your application,
 * share a system folder between multiple applications, and more.
 *
 * All paths are relative to the project's root folder.
 */
@Injectable()
export class Paths {
  /*
   * ---------------------------------------------------------------
   * WRITABLE DIRECTORY NAME
   * ---------------------------------------------------------------
   *
   * This variable must contain the name of your "writable" directory.
   * The writable directory allows you to group all directories that
   * need write permission to a single place that can be tucked away
   * for maximum security, keeping it out of the application and/or
   * system directories.
   */
  public writableDirectory = join(process.cwd(), 'writable');
}
