import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Login } from '../../core/store/auth/model/login';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state';
import { Subscription } from 'rxjs';
import { User } from '../../core/store/user/model/user';
import * as UserAction from '../../core/store/user/user.action';
import * as UserSelectors from '../../core/store/user/user.selector';
import * as AuthActions from '../../core/store/auth/auth.action';
import * as AuthSelectors from '../../core/store/auth/auth.selector';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import RegisterComponent from './register/register.component';
import { Jwt } from '../../core/store/user/model/jwt';
import { UserSearch } from '../../core/store/user/model/user.search';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		FormsModule,
		RouterLink,
		NgIf,
		RegisterComponent,
		ReactiveFormsModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit, OnDestroy {
	@Output() public localUser: EventEmitter<User> = new EventEmitter<User>();

	private readonly subscriptions: Subscription = new Subscription();

	public users: User[];
	public form: FormGroup;
	public alreadyRegistered: boolean = true;
	public loginAttempt: boolean = false;
	public invalidCredentials: boolean = false;
	private loginFields: Login;
	private userSearch: UserSearch;

	constructor(private readonly store: Store<AppState>) {
		this.loginFields = new Login();
	}

	public ngOnInit(): void {
		this.buildForm();

		this.store.dispatch(UserAction.getAllUsers());
		this.subscriptions.add(
			this.store
				.select(UserSelectors.getUsers)
				.subscribe((users: User[]): void => {
					this.users = users;
				})
		);

		this.subscriptions.add(
			this.store
				.select(AuthSelectors.jwtResponse)
				.subscribe((jwt: Jwt): void => {
					if (jwt !== undefined && jwt.token !== '') {
						this.loginAttempt = false;
						localStorage.setItem('token', jwt.token);
						if (jwt.id !== null) {
							this.loadUser(jwt.id);
						}
					}
				})
		);

		this.subscriptions.add(
			this.store
				.select(AuthSelectors.loggedUser)
				.subscribe((loggedUser: User): void => {
					if (loggedUser != null) {
						this.localUser.emit(loggedUser);
					}
				})
		);
	}

	public onLogin(): void {
		this.loginAttempt = true;
		this.loginFields = this.form.value as Login;

		this.store.dispatch(AuthActions.loginUser({ login: this.loginFields }));
	}

	public wantsToRegister(): void {
		this.alreadyRegistered = false;
	}

	public registerUser(request: User): void {
		this.store.dispatch(
			UserAction.registerUser({
				request: Object.assign({}, request),
			})
		);
	}

	private buildForm(): void {
		this.form = new FormGroup({
			email: new FormControl<string>(
				'',
				Validators.compose([Validators.required, Validators.email])
			),
			password: new FormControl<string>(
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
				])
			),
		});
	}

	private loadUser(id: number): void {
		this.store.dispatch(
			UserAction.getUserById({
				userSearch: { ...this.userSearch, userId: id },
			})
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
