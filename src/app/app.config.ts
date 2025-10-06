import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CoreModule } from './core/services/core-module';
import { withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptor/error';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    importProvidersFrom(
      CoreModule.forRoot(true) // true = HttpBookService false = InMemoryBookService
    )
  ]
};