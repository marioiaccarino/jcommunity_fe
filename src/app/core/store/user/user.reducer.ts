import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User, UserJSON } from './model/user';
import { Jwt } from './model/jwt';
import * as AuthActions from '../auth/auth.action';

export interface UserState {
	users: User[];
}

export const initialState: UserState = {
	users: [],
};

export const userReducer = createReducer(
	initialState,
	on(UserActions.getAllUsersSuccess, (state, action) => ({
		...state,
		users: [...action.users.map((value: UserJSON) => User.fromJSON(value))],
	}))
);
