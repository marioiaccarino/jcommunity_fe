import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },

	{
		path: 'home',
		loadComponent: () => import('./features/home/home.component'),
		canActivate: [authGuard],
	},

	{
		path: 'communities',
		loadComponent: () =>
			import('./features/communities/communities.component'),
		canActivate: [authGuard],
	},
	{
		path: 'community',
		loadComponent: () =>
			import('./features/communities/community/community.component'),
	},
];
