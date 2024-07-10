import { ApplicationConfig } from '@angular/core';
import {
	provideRouter,
	withComponentInputBinding,
	withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers } from './app-reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { effects } from './app-effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withComponentInputBinding(),
			withViewTransitions()
		),
		provideAnimations(),
		provideHttpClient(withInterceptors([authInterceptor])),
		provideStore(reducers),
		provideStoreDevtools({
			connectInZone: true,
		}),
		provideEffects(effects),
	],
};
