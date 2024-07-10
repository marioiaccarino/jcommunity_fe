import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../store/user/model/user';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserCommunity } from '../../../store/userCommunity/model/user.community';
import * as UserCommunityActions from '../../../store/userCommunity/user.community.action';
import * as UserCommunitySelectors from '../../../store/userCommunity/user.community.selector';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../app-state';
import { Subscription } from 'rxjs';
import { UserCommunitySearch } from '../../../store/userCommunity/model/user.community.search';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [NgForOf, JsonPipe, RouterLink, RouterLinkActive, NgIf],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
	@Input() public loggedUser: User;
	public usersCommunityOfLoggedUser: UserCommunity[] = [];
	private userCommunitySearch: UserCommunitySearch;
	private readonly subscriptions: Subscription = new Subscription();
	constructor(private readonly store: Store<AppState>) {}

	public ngOnInit(): void {
		this.userCommunitySearch = new UserCommunitySearch(this.loggedUser.id);
		this.store.dispatch(
			UserCommunityActions.getUsersCommunityOfLoggedUser({
				userCommunitySearch: { ...this.userCommunitySearch },
			})
		);
		this.subscriptions.add(
			this.store
				.select(UserCommunitySelectors.getUsersCommunityOfLoggedUser)
				.subscribe((usersCommunityOfLoggedUser: UserCommunity[]) => {
					console.log(usersCommunityOfLoggedUser);
					this.usersCommunityOfLoggedUser =
						usersCommunityOfLoggedUser;
				})
		);
	}
	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
