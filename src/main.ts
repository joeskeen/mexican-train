import {
  enableProdMode
} from '@angular/core';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  HcToasterService
} from '@healthcatalyst/cashmere';

import {
  AppModule
} from './app/app.module';
import {
  environment
} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(ref => {
  const toasts = ref.injector.get(HcToasterService);
  console.log = message => toasts.addToast({
    type: 'info', header: 'console.log', body: message
  });
})
.catch(err => console.error(err));