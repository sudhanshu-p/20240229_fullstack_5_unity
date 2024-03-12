import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { SwaggerUIAngularModule } from 'swagger-ui-dist';


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
