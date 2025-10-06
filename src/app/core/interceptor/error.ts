import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      logger.error('HTTP Error', error);
      
      let userMessage = 'Error de conexión';
      if (error.status === 404) userMessage = 'No encontrado';
      if (error.status >= 500) userMessage = 'Error del servidor';
      
      console.error('💥 ' + userMessage);
      
      return throwError(() => error);
    })
  );
};