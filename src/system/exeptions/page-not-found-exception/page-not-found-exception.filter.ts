import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class PageNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Check if the request is GET
    if (request.method === 'GET') {
      // Send a custom 404 error response
      const data = {
        pageNotFound: '404 Page Not Found',
        message: 'The page you requested was not found.',
      };
      response.status(404).render('error/HTTP_NOT_FOUND', data);
    } else {
      // For other HTTP methods, we throw the error as standard
      response.status(404).json({
        message: `Cannot ${request.method} ${request.url}`,
        error: 'Not Found',
        statusCode: 404,
      });
    }
  }
}
