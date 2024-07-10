import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './services/user.service';
import * as UserActions from './user.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserJSON } from './model/user';
import { JwtJSON } from './model/jwt';

@Injectable()
export class UserEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService
	) {}

	public getaAllUsersEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getAllUsers),
			switchMap(() =>
				this.userService
					.getAll()
					.pipe(
						map((users: UserJSON[]) =>
							UserActions.getAllUsersSuccess({ users })
						)
					)
			)
		)
	);
	public registerUserEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.registerUser),
			switchMap((action) =>
				this.userService.registerUser(action.request).pipe(
					map((jwtResponse: JwtJSON) =>
						jwtResponse
							? UserActions.registerUserSuccess({
									jwtResponse,
								})
							: UserActions.loginUserFailed()
					)
				)
			)
		)
	);

	public getUserEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getUserById), // Update the action name
			switchMap((action) =>
				this.userService
					.getUserById(action.userSearch) // Update the service method and action parameter
					.pipe(
						map((loggedUser: UserJSON) =>
							UserActions.getUserByIdSuccess({ loggedUser })
						) // Update the action name
					)
			)
		)
	);
}
