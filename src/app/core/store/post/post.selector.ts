import { AppState } from '../../../app-state';
import { PostState } from './post.reducer';
import { createSelector } from '@ngrx/store';
import { Post } from './model/post';

const root = (state: AppState): PostState => state.post;

export const getPosts = createSelector(
	root,
	(state: PostState): Post[] => state.posts
);

export const getPostsOfUserCommunity = createSelector(
	root,
	(state: PostState): Post[] => state.postsOfUserCommunity
);

export const getPostsFromTheSelectedCommunity = createSelector(
	root,
	(state: PostState): Post[] => state.postsFromTheSelectedCommunity
);
