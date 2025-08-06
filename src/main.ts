import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { LoadingInterceptor } from './app/core/interceptors/loading.interceptor'; // ajusta el path según tu estructura

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ Registro del interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },

    provideRouter(routes),
  ],
});
