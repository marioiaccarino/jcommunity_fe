import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/services/auth.service';
import * as AuthActions from '../auth/auth.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JwtJSON } from '../user/model/jwt';
import { UserJSON } from '../user/model/user';

@Injectable()
export class AuthEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService
	) {}

	public loginUserEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginUser),
			switchMap((action) =>
				this.authService
					.loginUser(action.login)
					.pipe(
						map((jwtResponse: JwtJSON) =>
							AuthActions.loginUserSuccess({ jwtResponse })
						)
					)
			)
		)
	);
}
