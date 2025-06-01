import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { routes } from './app.routes';

registerLocaleData(localePt, 'pt-br', localePtExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ],
};
