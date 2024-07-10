import { User } from '../user/model/user';
import { Jwt } from '../user/model/jwt';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth/auth.action';
import * as UserActions from '../user/user.action';

export interface AuthState {
	loggedUser: User | undefined;
	loginFailed: boolean;
	jwtResponse: Jwt | undefined;
}

export const initialState: AuthState = {
	loggedUser: JSON.parse(localStorage.getItem('email') || '""'),
	loginFailed: false,
	jwtResponse: undefined,
};

export const authReducer = createReducer(
	initialState,
	on(AuthActions.loginUserSuccess, (state, action) => ({
		...state,
		jwtResponse: Jwt.fromJSON(action.jwtResponse),
	})),
	on(UserActions.registerUserSuccess, (state, action) => ({
		...state,
		jwtResponse: Jwt.fromJSON(action.jwtResponse),
	})),
	on(UserActions.getUserByIdSuccess, (state, action) => ({
		...state,
		loggedUser: User.fromJSON(action.loggedUser),
	})),

	on(UserActions.logoutUser, (state) => ({
		...state,
		loggedUser: undefined,
		jwtResponse: undefined,
	})),

	on(UserActions.loginUserFailed, (state) => ({
		...state,
		loginFailed: true,
	}))
);
