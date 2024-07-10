import { Post, PostJSON } from './model/post';
import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.action';

export interface PostState {
	posts: Post[];
	postsOfUserCommunity: Post[];
	postsFromTheSelectedCommunity: Post[];
}

export const initialState: PostState = {
	posts: [],
	postsOfUserCommunity: [],
	postsFromTheSelectedCommunity: [],
};

export const postReducer = createReducer(
	initialState,
	on(PostActions.getAllPostFromUsersCommunityIdSuccess, (state, action) => {
		return {
			...state,
			postsOfUserCommunity: [
				...action.posts.map((value: PostJSON) => Post.fromJSON(value)),
			],
		};
	}),
	on(PostActions.getPostsSuccess, (state, action) => {
		return {
			...state,
			posts: [
				...action.posts.map((value: PostJSON) => Post.fromJSON(value)),
			],
		};
	}),
	on(PostActions.getPostsFromTheSelectedCommunitySuccess, (state, action) => {
		return {
			...state,
			postsFromTheSelectedCommunity: [
				...action.postsFromTheSelectedCommunity.map((value: PostJSON) =>
					Post.fromJSON(value)
				),
			],
		};
	})
);
