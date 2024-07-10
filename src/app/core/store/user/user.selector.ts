import { AppState } from '../../../app-state';
import { UserState } from './user.reducer';
import { createSelector } from '@ngrx/store';
import { User } from './model/user';

const root = (state: AppState): UserState => state.user;

export const getUsers = createSelector(
	root,
	(state: UserState): User[] => state.users
);
