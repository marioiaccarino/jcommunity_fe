import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import * as fromUserReducer from './core/store/user/user.reducer';
import * as fromCommunityReducer from './core/store/community/community.reducer';
import * as fromUserCommunityReducer from './core/store/userCommunity/user.community.reducer';
import * as fromPostReducer from './core/store/post/post.reducer';
import * as fromAuthReducer from './core/store/auth/auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
	router: routerReducer,
	user: fromUserReducer.userReducer,
	community: fromCommunityReducer.communityReducer,
	userCommunity: fromUserCommunityReducer.userCommunityReducer,
	post: fromPostReducer.postReducer,
	auth: fromAuthReducer.authReducer,
};
