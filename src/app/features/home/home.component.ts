import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/store/user/model/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state';
import * as UserCommunitySelector from '../../core/store/userCommunity/user.community.selector';
import * as AuthSelectors from '../../core/store/auth/auth.selector';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import * as PostSelectors from '../../core/store/post/post.selector';
import * as PostActions from '../../core/store/post/post.action';
import * as UserCommunityActions from '../../core/store/userCommunity/user.community.action';
import { UserCommunity } from '../../core/store/userCommunity/model/user.community';
import { Post } from '../../core/store/post/model/post';
import { PostSearch } from '../../core/store/post/model/post.search';
import { UserCommunitySearch } from '../../core/store/userCommunity/model/user.community.search';
import { Community } from '../../core/store/community/model/community';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [JsonPipe, AsyncPipe, NgForOf, NgIf, RouterLink],
	templateUrl: `home.component.html`,
	styleUrl: `home.component.scss`,
})
export default class HomeComponent implements OnInit, OnDestroy {
	public subscribedCommunities: Community[] = [];
	public usersCommunity: UserCommunity[] = [];
	public allUsersCommunity: UserCommunity[] = [];
	public posts: Post[] = [];
	public loggedUser: User;

	private readonly subscriptions: Subscription = new Subscription();
	private postSearch: PostSearch;
	private userCommunitySearch: UserCommunitySearch;

	constructor(
		private readonly store: Store<AppState>,
		private readonly router: Router
	) {}

	public ngOnInit(): void {
		this.initStore();
	}

	public communityContainsPosts(community: Community): Post {
		console.log(this.posts);
		return this.posts.find(
			(post) => post.author.subscribedCommunity.id === community.id
		);
	}

	public redirectToCommunities(): void {
		void this.router.navigateByUrl('communities');
	}

	private initStore(): void {
		this.subscriptions.add(
			this.store
				.select(AuthSelectors.loggedUser)
				.subscribe((loggedUser: User): void => {
					this.loggedUser = loggedUser;
				})
		);

		this.store.dispatch(UserCommunityActions.getAllUsersCommunity());

		this.subscriptions.add(
			this.store
				.select(UserCommunitySelector.getUsersCommunity)
				.subscribe((usersCommunity: UserCommunity[]): void => {
					this.allUsersCommunity = usersCommunity;
				})
		);

		this.userCommunitySearch = new UserCommunitySearch(this.loggedUser.id);
		this.store.dispatch(
			UserCommunityActions.getUsersCommunityOfLoggedUser({
				userCommunitySearch: { ...this.userCommunitySearch },
			})
		);

		this.subscriptions.add(
			this.store
				.select(UserCommunitySelector.getUsersCommunityOfLoggedUser)
				.subscribe((usersCommunity: UserCommunity[]): void => {
					this.usersCommunity = usersCommunity;
					this.subscribedCommunities = this.usersCommunity.map(
						(userCommunity: UserCommunity) =>
							userCommunity.subscribedCommunity
					);
					if (this.usersCommunity.length !== 0) {
						this.store.dispatch(
							PostActions.getAllPostFromUsersCommunityId({
								postSearch: {
									...this.postSearch,
									usersCommunityId: usersCommunity.map(
										(userCommunity: UserCommunity) =>
											userCommunity.id
									),
									communityId: null,
								},
							})
						);
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(PostSelectors.getPostsOfUserCommunity)
				.subscribe((posts: Post[]): void => {
					this.posts = posts;
				})
		);
	}
	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
