import { Community } from './model/community';
import { createReducer, on } from '@ngrx/store';
import * as CommunityActions from './community.action';
export interface CommunityState {
	communities: Community[];
	communityFoundById: Community | undefined;
}

export const initialState: CommunityState = {
	communities: [],
	communityFoundById: undefined,
};

export const communityReducer = createReducer(
	initialState,
	on(CommunityActions.getAllCommunitiesSuccess, (state, action) => {
		return {
			...state,
			communities: [
				...action.communities.map((value) => Community.fromJSON(value)),
			],
		};
	}),
	on(CommunityActions.getCommunityByIdSuccess, (state, action) => {
		return {
			...state,
			communityFoundById: Community.fromJSON(action.communityFoundById),
		};
	})
);
