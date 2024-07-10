import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { User } from '../../../store/user/model/user';
import { Subscription, window } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app-state';
import * as UserActions from '../../../store/user/user.action';
import * as AuthSelectors from '../../../store/auth/auth.selector';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgIf],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() public logoutUser = new EventEmitter();
	@Input() public loggedUser: User;

	private readonly subscriptions: Subscription = new Subscription();
	constructor(
		private readonly store: Store<AppState>,
		public readonly storage: StorageService
	) {}
	public ngOnInit(): void {
		this.subscriptions.add(
			this.store
				.select(AuthSelectors.loggedUser)
				.subscribe((loggedUser: User) => {
					if (loggedUser === undefined) {
						this.logoutUser.emit();
					}
				})
		);
	}
	public onLogout(): void {
		this.store.dispatch(UserActions.logoutUser());
		this.clearUserSession();
	}
	public clearUserSession(): void {
		this.storage.clearLocalStorage();
		console.log(this.storage.getLocalStorage());
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
