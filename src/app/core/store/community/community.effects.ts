import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as CommunityActions from './community.action';
import { CommunityService } from './services/community.service';
import { CommunityJSON } from './model/community';

@Injectable()
export class CommunityEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly communityService: CommunityService
	) {}

	public getAllCommunityEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommunityActions.getAllCommunities),
			switchMap(() =>
				this.communityService.getAll().pipe(
					map((communities: CommunityJSON[]) =>
						CommunityActions.getAllCommunitiesSuccess({
							communities,
						})
					),
					catchError((err, caught) => caught)
				)
			)
		)
	);

	public getCommunityById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommunityActions.getCommunityById),
			switchMap((action) =>
				this.communityService.getCommunityById(action.communityId).pipe(
					map((communityFoundById: CommunityJSON) =>
						CommunityActions.getCommunityByIdSuccess({
							communityFoundById,
						})
					)
				)
			)
		)
	);
}
