import {
	Component,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state';
import { Community } from '../../core/store/community/model/community';
import * as AuthSelectors from '../../core/store/auth/auth.selector';
import * as CommunityActions from '../../core/store/community/community.action';
import * as CommunitySelectors from '../../core/store/community/community.selector';
import * as UserCommunityActions from '../../core/store/userCommunity/user.community.action';
import * as UserCommunitySelectors from '../../core/store/userCommunity/user.community.selector';
import { User } from '../../core/store/user/model/user';
import { NgForOf, NgIf } from '@angular/common';
import { UserCommunity } from '../../core/store/userCommunity/model/user.community';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { CommunityDetailsComponent } from './community.details/community.details.component';
import { Post } from '../../core/store/post/model/post';
import * as PostActions from '../../core/store/post/post.action';
import * as PostSelectors from '../../core/store/post/post.selector';
import CommunityComponent from './community/community.component';
import { PostSearch } from '../../core/store/post/model/post.search';
import { UserCommunitySearch } from '../../core/store/userCommunity/model/user.community.search';
import { UserCommunityCreate } from '../../core/store/userCommunity/model/user.community.create';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UserCommunityDelete } from '../../core/store/userCommunity/model/user.community.delete';
import { DefaultAlert } from '../../core/model/alert';

@Component({
	selector: 'app-communities',
	standalone: true,
	imports: [
		NgForOf,
		NgIf,
		FormsModule,
		CommunityDetailsComponent,
		CommunityComponent,
		ReactiveFormsModule,
		AlertModule,
	],
	templateUrl: './communities.component.html',
	styleUrl: './communities.component.scss',
})
export default class CommunitiesComponent implements OnInit, OnDestroy {
	private readonly subscriptions: Subscription = new Subscription();
	public usersCommunityOfLoggedUser: UserCommunity[] = [];
	public communities: Community[] = [];
	public searchedCommunity: Community | null = null;
	public loggedUser: User;
	public allPosts: Post[] = [];
	public wantsToViewCommunity: boolean = false;
	public communityFoundById: Community;
	public postsFromTheSelectedCommunity: Post[];
	public formSearch: FormGroup;
	public showAlert: boolean = false;
	public alert: DefaultAlert | null = null;
	public hasJoinedCommunity: boolean = false;

	private postSearch: PostSearch;
	private userCommunitySearch: UserCommunitySearch;
	private userCommunityDelete: UserCommunityDelete;

	constructor(private readonly store: Store<AppState>) {}

	public ngOnInit(): void {
		this.buildForm();
		this.subscribeToFormValue();
		this.subscriptions.add(
			this.store
				.select(AuthSelectors.loggedUser)
				.subscribe((loggedUser: User): void => {
					this.loggedUser = loggedUser;
				})
		);

		this.store.dispatch(PostActions.getPosts());
		this.subscriptions.add(
			this.store
				.select(PostSelectors.getPosts)
				.subscribe((posts: Post[]): void => {
					this.allPosts = posts;
					console.log(this.allPosts);
				})
		);

		this.store.dispatch(CommunityActions.getAllCommunities());
		this.subscriptions.add(
			this.store
				.select(CommunitySelectors.getCommunities)
				.subscribe((communities: Community[]): void => {
					this.communities = communities;
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
				.select(UserCommunitySelectors.getUsersCommunityOfLoggedUser)
				.subscribe(
					(usersCommunityOfLoggedUser: UserCommunity[]): void => {
						this.usersCommunityOfLoggedUser =
							usersCommunityOfLoggedUser;
					}
				)
		);

		this.subscriptions.add(
			this.store
				.select(CommunitySelectors.getCommunityFoundById)
				.subscribe((communityFoundById: Community): void => {
					if (communityFoundById) {
						this.communityFoundById = communityFoundById;
						this.store.dispatch(
							PostActions.getPostsFromTheSelectedCommunity({
								postSearch: {
									...this.postSearch,
									communityId: communityFoundById.id,
									usersCommunityId: [],
								},
							})
						);
						this.wantsToViewCommunity = true;
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(PostSelectors.getPostsFromTheSelectedCommunity)
				.subscribe((postsFromTheSelectedCommunity: Post[]): void => {
					if (postsFromTheSelectedCommunity !== undefined) {
						this.postsFromTheSelectedCommunity =
							postsFromTheSelectedCommunity;
						console.log(
							'post selected from...',
							this.postsFromTheSelectedCommunity
						);
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(UserCommunitySelectors.getUserCommunityDeleted)
				.subscribe((userCommunityDeleted: UserCommunity): void => {
					if (userCommunityDeleted) {
						this.store.dispatch(
							UserCommunityActions.getUsersCommunityOfLoggedUser({
								userCommunitySearch: {
									...this.userCommunitySearch,
									loggedUserId: this.loggedUser.id,
								},
							})
						);
						this.alert = new DefaultAlert(
							'Success',
							`unsubscribed to `.concat(
								this.searchCommunityById(
									userCommunityDeleted.subscribedCommunity.id
								).name
							)
						);
						console.log(
							'userCommunity Deleted trigger userCommunityDeleted'
						);
						console.log('alert:', this.alert);
						this.showAlert = true;
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(UserCommunitySelectors.getUserCommunityCreated)
				.subscribe((userCommunityCreated: UserCommunity): void => {
					if (userCommunityCreated) {
						this.hasJoinedCommunity = true;
						this.store.dispatch(
							UserCommunityActions.getUsersCommunityOfLoggedUser({
								userCommunitySearch: {
									...this.userCommunitySearch,
									loggedUserId: this.loggedUser.id,
								},
							})
						);
					}
				})
		);
	}

	public onCreateUserCommunity(
		userCommunityCreate: UserCommunityCreate
	): void {
		this.store.dispatch(
			UserCommunityActions.createUserCommunity({
				userCommunityCreate,
			})
		);
	}

	public onDeleteUserCommunity(communityId: number): void {
		this.userCommunityDelete = new UserCommunityDelete();
		const userCommunityTmp: UserCommunity =
			this.usersCommunityOfLoggedUser.find(
				(userCommunity: UserCommunity) =>
					userCommunity.subscribedCommunity.id === communityId
			);
		this.store.dispatch(
			UserCommunityActions.deleteUserCommunity({
				userCommunityDelete: {
					...this.userCommunityDelete,
					id: userCommunityTmp.id,
					communityId: userCommunityTmp.subscribedCommunity.id,
				},
			})
		);
	}

	public onClosed(): void {
		this.showAlert = false;
	}

	public viewCommunity(communityId: number): void {
		this.hasJoinedCommunity = false;
		this.store.dispatch(CommunityActions.getCommunityById({ communityId }));
	}

	public showAllCommunities(): void {
		this.wantsToViewCommunity = false;
	}

	private buildForm(): void {
		this.formSearch = new FormGroup({
			searchCommunity: new FormControl<string>(''),
		});
	}

	private subscribeToFormValue(): void {
		this.formSearch
			.get('searchCommunity')
			.valueChanges.subscribe((value): void => {
				if (value !== '') {
					console.log('Searched Community Changed', value);
					this.searchedCommunity = this.communities.find(
						(community: Community): boolean =>
							community.name
								? community.name.toLowerCase().startsWith(value)
								: false
					);
				} else {
					this.searchedCommunity = null;
				}
			});
	}

	private searchCommunityById(communityId: number): Community | null {
		return this.communities.find(
			(community: Community) => community.id === communityId
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
