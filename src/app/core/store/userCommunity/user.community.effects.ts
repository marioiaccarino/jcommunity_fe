import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as UserCommunityActions from './user.community.action';
import { UserCommunityService } from './services/user.community.service';
import { UserCommunity, UserCommunityJSON } from './model/user.community';
import {
	UserCommunityCreate,
	UserCommunityCreateJSON,
} from './model/user.community.create';

@Injectable()
export class UserCommunityEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userCommunityService: UserCommunityService
	) {}

	public getAllUsersCommunityEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserCommunityActions.getAllUsersCommunity),
			switchMap(() =>
				this.userCommunityService.getAll().pipe(
					map((usersCommunity) =>
						UserCommunityActions.getAllUsersCommunitySuccess({
							usersCommunity,
						})
					),
					catchError((err, caught) => caught)
				)
			)
		)
	);

	public getUsersCommunityOfLoggedUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserCommunityActions.getUsersCommunityOfLoggedUser),
			switchMap((action) =>
				this.userCommunityService
					.getAllUsersCommunityOfLoggedUser(
						action.userCommunitySearch
					)
					.pipe(
						map((usersCommunityOfLoggedUser: UserCommunityJSON[]) =>
							UserCommunityActions.getUsersCommunityOfLoggedUserSuccess(
								{ usersCommunityOfLoggedUser }
							)
						)
					)
			)
		)
	);

	public createUserCommunityEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserCommunityActions.createUserCommunity),
			switchMap((action) =>
				this.userCommunityService
					.createUserCommunity(action.userCommunityCreate)
					.pipe(
						map((userCommunityCreated: UserCommunityJSON) =>
							UserCommunityActions.createUserCommunitySuccess({
								userCommunityCreated,
							})
						)
					)
			)
		)
	);

	public deleteUserCommunityEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserCommunityActions.deleteUserCommunity),
			switchMap((action) =>
				this.userCommunityService
					.deleteUserCommunity(action.userCommunityDelete)
					.pipe(
						map((userCommunityDeleted: UserCommunityJSON) =>
							UserCommunityActions.deleteUserCommunitySuccess({
								userCommunityDeleted,
							})
						)
					)
			)
		)
	);
}
