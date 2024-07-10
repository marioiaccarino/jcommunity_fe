import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../../core/store/user/model/user';

@Component({
	selector: 'app-register',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, NgIf, ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
	@Output() public wantsToLogin: EventEmitter<void> =
		new EventEmitter<void>();
	@Output() public formRegister: EventEmitter<User> =
		new EventEmitter<User>();
	public form: FormGroup;
	private request: User;

	public ngOnInit(): void {
		this.buildForm();
	}

	public onRegister(): void {
		this.request = this.form.value as User;
		this.formRegister.emit(this.request);
	}

	private buildForm(): void {
		this.form = new FormGroup({
			firstName: new FormControl<string>('', Validators.required),
			lastName: new FormControl<string>('', Validators.required),
			urlImage: new FormControl<string>('', Validators.maxLength(250)),
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
	public backToLogin(): void {
		this.wantsToLogin.emit();
	}
}
