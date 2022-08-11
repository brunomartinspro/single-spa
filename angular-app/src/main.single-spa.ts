import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, NgZone, ApplicationRef  } from '@angular/core';
import { LocationStrategy  } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavigationStart, Router } from '@angular/router';
import {
  getSingleSpaExtraProviders,
  singleSpaAngular,
} from 'single-spa-angular';
import 'zone.js/dist/zone';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  SingleSpaProps,
  singleSpaPropsSubject,
} from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular<SingleSpaProps>({
  bootstrapFunction: async (singleSpaProps) => {
     // The route passed in the props starts with "^/". e.g "^/angular-app". So we extract the relevant part only from it.
     const baseHref = singleSpaProps.route.match(/\/.*/)?.[0];
     singleSpaPropsSubject.next(singleSpaProps);

    const ngModuleRef = await platformBrowserDynamic([
      ...getSingleSpaExtraProviders(),
      { provide: APP_BASE_HREF, useValue: baseHref},
    ]).bootstrapModule(
      AppModule
    );

    return ngModuleRef;
    
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
