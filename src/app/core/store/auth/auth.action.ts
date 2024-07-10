import { createAction, props } from '@ngrx/store';
import { Login } from './model/login';
import { JwtJSON } from '../user/model/jwt';
import { UserJSON } from '../user/model/user';

export const loginUser = createAction(
	'[Auth] Login User by Credentials',
	props<{ login: Login }>()
);
export const loginUserSuccess = createAction(
	'[Auth] Login User Success',
	props<{ jwtResponse: JwtJSON }>()
);
