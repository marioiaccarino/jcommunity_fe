import { createAction, props } from '@ngrx/store';
import { CommunityJSON } from './model/community';

export const getAllCommunities = createAction(
	'[Community] Get All Communities'
);

export const getAllCommunitiesSuccess = createAction(
	'[Community] Get All Communities Success',
	props<{ communities: CommunityJSON[] }>()
);

export const getCommunityById = createAction(
	'[Community] Get Community By Id',
	props<{ communityId: number }>()
);

export const getCommunityByIdSuccess = createAction(
	'[Community] Get Community By Id Success',
	props<{ communityFoundById: CommunityJSON }>()
);
