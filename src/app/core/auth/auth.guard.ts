import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
	const token = localStorage.getItem('token');
	const router = inject(Router);
	if (token) {
		console.log("c'è l'utente authGuard");
		return true;
	}
	router.navigate(['login']);
	return false;
};
