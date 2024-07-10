import { createAction, props } from '@ngrx/store';
import { UserCommunityJSON } from './model/user.community';
import { UserCommunitySearch } from './model/user.community.search';
import { UserCommunityCreate } from './model/user.community.create';
import { UserCommunityDelete } from './model/user.community.delete';

export const deleteUserCommunitySuccess = createAction(
	'[UserCommunity] Delete User Community Success',
	props<{ userCommunityDeleted: UserCommunityJSON }>()
);
export const deleteUserCommunity = createAction(
	'[UserCommunity] Delete User Community',
	props<{ userCommunityDelete: UserCommunityDelete }>()
);

export const createUserCommunitySuccess = createAction(
	'[UserCommunity] Create User Community Success',
	props<{ userCommunityCreated: UserCommunityJSON }>()
);

export const createUserCommunity = createAction(
	'[UserCommunity] Create User Community',
	props<{ userCommunityCreate: UserCommunityCreate }>()
);

export const getAllUsersCommunity = createAction(
	'[UserCommunity] Get All Users Community'
);

export const getUsersCommunityOfLoggedUser = createAction(
	'[UserCommunity] Get All Users Community Of Logged User',
	props<{ userCommunitySearch: UserCommunitySearch }>()
);

export const getUsersCommunityOfLoggedUserSuccess = createAction(
	'[UserCommunity] Get All Users Community Of Logged User Success',
	props<{ usersCommunityOfLoggedUser: UserCommunityJSON[] }>()
);

export const getAllUsersCommunitySuccess = createAction(
	'[UserCommunity] Get All Users Community Success',
	props<{ usersCommunity: UserCommunityJSON[] }>()
);
