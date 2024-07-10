import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostActions from './post.action';
import { switchMap } from 'rxjs';
import { PostJSON } from './model/post';
import { map } from 'rxjs/operators';
import { PostService } from './service/post.service';

@Injectable()
export class PostEffect {
	constructor(
		private readonly actions$: Actions,
		private readonly postService: PostService
	) {}

	public getAllPostsByUsersCommunityId$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.getAllPostFromUsersCommunityId),
			switchMap((action) =>
				this.postService
					.getAllPostsFromUsersCommunityId(action.postSearch)
					.pipe(
						map((posts: PostJSON[]) =>
							PostActions.getAllPostFromUsersCommunityIdSuccess({
								posts,
							})
						)
					)
			)
		)
	);

	public getAllPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.getPosts),
			switchMap(() =>
				this.postService
					.getAllPosts()
					.pipe(
						map((posts: PostJSON[]) =>
							PostActions.getPostsSuccess({ posts })
						)
					)
			)
		)
	);

	public getPostsFromTheSelectedCommunity$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.getPostsFromTheSelectedCommunity),
			switchMap((action) =>
				this.postService
					.getPostsFromTheSelectedCommunity(action.postSearch)
					.pipe(
						map((postsFromTheSelectedCommunity: PostJSON[]) =>
							PostActions.getPostsFromTheSelectedCommunitySuccess(
								{ postsFromTheSelectedCommunity }
							)
						)
					)
			)
		)
	);
}
