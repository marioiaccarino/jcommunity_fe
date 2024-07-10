import { createAction, props } from '@ngrx/store';

import { User, UserJSON } from './model/user';
import { JwtJSON } from './model/jwt';
import { UserSearch } from './model/user.search';

export const logoutUser = createAction('[User] Logout User');

export const getUserByIdSuccess = createAction(
	'[User] Get User By Id Success',
	props<{ loggedUser: UserJSON }>()
);

export const loginUserFailed = createAction('[User] Login User Failed');

export const getAllUsers = createAction('[User] Get All Users');

export const getAllUsersSuccess = createAction(
	'[User] Get All Users Success',
	props<{ users: UserJSON[] }>()
);

export const registerUser = createAction(
	'[User] Register User',
	props<{ request: User }>()
);

export const registerUserSuccess = createAction(
	'[User] Register User Success',
	props<{ jwtResponse: JwtJSON }>()
);
export const getUserById = createAction(
	'[User] Get User By id',
	props<{ userSearch: UserSearch }>()
);
