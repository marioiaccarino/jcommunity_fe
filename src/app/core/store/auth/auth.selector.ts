import { AppState } from '../../../app-state';
import { AuthState } from './auth.reducer';
import { createSelector } from '@ngrx/store';
import { User } from '../user/model/user';
import { Jwt } from '../user/model/jwt';

const root = (state: AppState): AuthState => state.auth;

export const loggedUser = createSelector(
	root,
	(state: AuthState): User => <User>state.loggedUser
);

export const loginFailed = createSelector(
	root,
	(state: AuthState): boolean => state.loginFailed
);

export const jwtResponse = createSelector(
	root,
	(state: AuthState): Jwt => <Jwt>state.jwtResponse
);
