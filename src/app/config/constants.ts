/*
 | --------------------------------------------------------------------
 | App Namespace
 | --------------------------------------------------------------------
 |
 | This defines the default Namespace that is used throughout
 | CodeIgniter to refer to the Application directory. Change
 | this constant to change the namespace that all application
 | classes should use.
 |
 | NOTE: changing this will require manually modifying the
 | existing namespaces of App\* namespaced-classes.
 */
export const APP_NAMESPACE = 'App';

/*
 |--------------------------------------------------------------------------
 | Timing Constants
 |--------------------------------------------------------------------------
 |
 | Provide simple ways to work with the myriad of PHP functions that
 | require information to be in seconds.
 */
export const SECOND = 1;
export const MINUTE = 60;
export const HOUR = 3600;
export const DAY = 86400;
export const WEEK = 604800;
export const MONTH = 2_592_000;
export const YEAR = 31_536_000;
export const DECADE = 315_360_000;

/*
 | --------------------------------------------------------------------------
 | Exit Status Codes
 | --------------------------------------------------------------------------
 |
 | Used to indicate the conditions under which the script is exit()ing.
 | While there is no universal standard for error codes, there are some
 | broad conventions.  Three such conventions are mentioned below, for
 | those who wish to make use of them.  The CodeIgniter defaults were
 | chosen for the least overlap with these conventions, while still
 | leaving room for others to be defined in future versions and user
 | applications.
 |
 | The three main conventions used for determining exit status codes
 | are as follows:
 |
 |    Standard C/C++ Library (stdlibc):
 |       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
 |       (This link also contains other GNU-specific conventions)
 |    BSD sysexits.h:
 |       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
 |    Bash scripting:
 |       http://tldp.org/LDP/abs/html/exitcodes.html
 |
 */
export const EXIT_SUCCESS = 0; // no errors
export const EXIT_ERROR = 1; // generic error
export const EXIT_CONFIG = 3; // configuration error
export const EXIT_UNKNOWN_FILE = 4; // file not found
export const EXIT_UNKNOWN_CLASS = 5; // unknown class
export const EXIT_UNKNOWN_METHOD = 6; // unknown class member
export const EXIT_USER_INPUT = 7; // invalid user input
export const EXIT_DATABASE = 8; // database error
export const EXIT__AUTO_MIN = 9; // lowest automatically-assigned error code
export const EXIT__AUTO_MAX = 125; // highest automatically-assigned error code
