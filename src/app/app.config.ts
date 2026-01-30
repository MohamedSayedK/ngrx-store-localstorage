// Global application configuration:
// - This is where we register Angular providers and wire up NgRx with persistence.
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers } from './store/meta-reducers/local-storage';
import { signupReducer, signupFeatureKey } from './store/signup/signup.reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Helpful errors in the browser console:
    provideBrowserGlobalErrorListeners(),
    // Router with our app routes:
    provideRouter(routes),
    // Root store:
    // - The first argument is the root reducer map (we start empty here).
    // - metaReducers enables ngrx-store-localstorage to persist configured slices.
    provideStore({}, { metaReducers }),
    // Register the 'signup' feature state under its key:
    // - This makes selectFeature selectors work and aligns with the meta-reducer keys.
    provideState(signupFeatureKey, signupReducer),
    // DevTools for learning/debugging:
    // - maxAge limits the history length to keep memory usage reasonable.
    provideStoreDevtools({ maxAge: 25 })
  ]
};
