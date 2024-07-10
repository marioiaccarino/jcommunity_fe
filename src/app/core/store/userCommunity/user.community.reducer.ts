import { UserCommunity } from './model/user.community';
import { createReducer, on } from '@ngrx/store';
import * as UserCommunityActions from './user.community.action';
import { getUsersCommunityOfLoggedUserSuccess } from './user.community.action';

export interface UserCommunityState {
	allUsersCommunity: UserCommunity[];
	usersCommunityOfLoggedUser: UserCommunity[];
	userCommunityDeleted: UserCommunity | null;
	userCommunityCreated: UserCommunity | null;
}

export const initialState: UserCommunityState = {
	allUsersCommunity: [],
	usersCommunityOfLoggedUser: [],
	userCommunityDeleted: null,
	userCommunityCreated: null,
};

export const userCommunityReducer = createReducer(
	initialState,
	on(UserCommunityActions.getAllUsersCommunitySuccess, (state, action) => ({
		...state,
		allUsersCommunity: [
			...action.usersCommunity.map((value) =>
				UserCommunity.fromJSON(value)
			),
		],
	})),
	on(
		UserCommunityActions.getUsersCommunityOfLoggedUserSuccess,
		(state, action) => ({
			...state,
			usersCommunityOfLoggedUser: action.usersCommunityOfLoggedUser.map(
				(userCommunityJson) => UserCommunity.fromJSON(userCommunityJson)
			),
		})
	),
	on(UserCommunityActions.createUserCommunitySuccess, (state, action) => {
		const usersCommunityTmp: UserCommunity[] = [
			...state.usersCommunityOfLoggedUser,
			UserCommunity.fromJSON(action.userCommunityCreated),
		];

		return {
			...state,
			usersCommunityOfLoggedUser: usersCommunityTmp,
			userCommunityCreated: action.userCommunityCreated
				? UserCommunity.fromJSON(action.userCommunityCreated)
				: null,
		};
	}),
	on(UserCommunityActions.deleteUserCommunitySuccess, (state, action) => {
		return {
			...state,
			usersCommunityOfLoggedUser: state.usersCommunityOfLoggedUser.filter(
				(userComm: UserCommunity) =>
					userComm !==
					UserCommunity.fromJSON(action.userCommunityDeleted)
			),
			userCommunityDeleted: action.userCommunityDeleted
				? UserCommunity.fromJSON(action.userCommunityDeleted)
				: null,
		};
	})
);
