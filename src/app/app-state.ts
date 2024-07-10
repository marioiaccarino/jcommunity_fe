import { RouterReducerState } from '@ngrx/router-store';
import * as fromUserReducer from './core/store/user/user.reducer';
import * as fromCommunityReducer from './core/store/community/community.reducer';
import * as fromUserCommunityReducer from './core/store/userCommunity/user.community.reducer';
import * as fromPostReducer from './core/store/post/post.reducer';
import * as fromAuthReducer from './core/store/auth/auth.reducer';

export interface AppState {
	router: RouterReducerState;
	user: fromUserReducer.UserState;
	community: fromCommunityReducer.CommunityState;
	userCommunity: fromUserCommunityReducer.UserCommunityState;
	post: fromPostReducer.PostState;
	auth: fromAuthReducer.AuthState;
}
