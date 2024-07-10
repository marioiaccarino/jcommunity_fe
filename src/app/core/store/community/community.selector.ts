import { AppState } from '../../../app-state';
import { CommunityState } from './community.reducer';
import { createSelector } from '@ngrx/store';
import { Community } from './model/community';

const root = (state: AppState): CommunityState => state.community;

export const getCommunities = createSelector(
	root,
	(state: CommunityState): Community[] => state.communities
);

export const getCommunityFoundById = createSelector(
	root,
	(state: CommunityState): Community => <Community>state.communityFoundById
);
