import { createAction, props } from '@ngrx/store';
import { PostJSON } from './model/post';
import { PostSearch } from './model/post.search';

export const getAllPostFromUsersCommunityIdSuccess = createAction(
	'[Post] Get All Posts By UsersCommunity Id Success',
	props<{ posts: PostJSON[] }>()
);

export const getAllPostFromUsersCommunityId = createAction(
	'[Post] Get All Posts By UsersCommunity Id',
	props<{ postSearch: PostSearch }>()
);

export const getPosts = createAction('[Post] Get Posts');

export const getPostsSuccess = createAction(
	'[Post] Get Posts Success',
	props<{ posts: PostJSON[] }>()
);

export const getPostsFromTheSelectedCommunity = createAction(
	'[Post] Get Posts From The Selected Community',
	props<{ postSearch: PostSearch }>()
);

export const getPostsFromTheSelectedCommunitySuccess = createAction(
	'[Post] Get Posts From The Selected Community Success',
	props<{ postsFromTheSelectedCommunity: PostJSON[] }>()
);
