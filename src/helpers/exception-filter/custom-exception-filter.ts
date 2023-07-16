import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(
    error: Error & { status: number; cause?: string },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error.name !== 'QueryFailedError')
      response.status(error.status).json({
        developerMessage: error.message,
        userMessage: error?.cause,
        status: error.status,
      });
    else {
      Logger.error(error.message);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        developerMessage: 'Internal server error',
        userMessage: 'Erro interno do servidor',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
