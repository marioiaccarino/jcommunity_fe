import { AppState } from '../../../app-state';
import { UserCommunityState } from './user.community.reducer';
import { createSelector } from '@ngrx/store';
import { UserCommunity } from './model/user.community';

const root = (state: AppState): UserCommunityState => state.userCommunity;

export const getUsersCommunity = createSelector(
	root,
	(state: UserCommunityState): UserCommunity[] => state.allUsersCommunity
);

export const getUsersCommunityOfLoggedUser = createSelector(
	root,
	(state: UserCommunityState): UserCommunity[] =>
		state.usersCommunityOfLoggedUser
);

export const getUserCommunityDeleted = createSelector(
	root,
	(state: UserCommunityState): UserCommunity => state.userCommunityDeleted
);

export const getUserCommunityCreated = createSelector(
	root,
	(state: UserCommunityState): UserCommunity => state.userCommunityCreated
);
