import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Community } from '../../../core/store/community/model/community';
import {
	UserCommunity,
	UserCommunityJSON,
} from '../../../core/store/userCommunity/model/user.community';
import { NgClass, NgIf } from '@angular/common';
import { Post } from '../../../core/store/post/model/post';
import { Router, RouterLink } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { UserCommunityCreate } from '../../../core/store/userCommunity/model/user.community.create';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
	selector: 'app-community-details',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgIf,
		RouterLink,
		NgClass,
		ModalModule,
		ReactiveFormsModule,
		AlertModule,
	],
	templateUrl: './community.details.component.html',
	styleUrl: './community.details.component.scss',
})
export class CommunityDetailsComponent implements OnInit, OnChanges {
	@Input() public usersCommunityOfLoggedUser: UserCommunity[];
	@Input() public community: Community;
	@Input() public posts: Post[];

	@Output() public showCommunity: EventEmitter<number> =
		new EventEmitter<number>();
	@Output() public createUserCommunity: EventEmitter<UserCommunityCreate> =
		new EventEmitter<UserCommunityCreate>();
	@Output() public deleteUserCommunity: EventEmitter<number> =
		new EventEmitter<number>();

	public form: FormGroup;
	public postsOfCommunity: Post[];

	private userCommunityCreated: UserCommunityCreate;

	public ngOnInit(): void {
		this.buildForm();
	}

	public isSubscribedToCommunity(commId: number): number | undefined {
		return this.usersCommunityOfLoggedUser
			.map((uc: UserCommunity) => uc.subscribedCommunity.id)
			.find((communityId: number): boolean => communityId === commId);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.postsOfCommunity = this.posts.filter(
			(post: Post): boolean =>
				post.author.subscribedCommunity.id === this.community.id
		);
		console.log('posts Of Community', this.postsOfCommunity);
	}

	public onUserCommunity(): void {
		this.userCommunityCreated = new UserCommunityCreate();
		this.userCommunityCreated.loggedUserId =
			this.usersCommunityOfLoggedUser[0].user.id;
		this.userCommunityCreated.communityId = this.community.id;
		this.userCommunityCreated.nickname = this.form.get('nickname').value;
		if (
			this.userCommunityCreated.communityId !== null &&
			this.userCommunityCreated.loggedUserId !== null
		) {
			this.createUserCommunity.emit(this.userCommunityCreated);
		}
	}

	private buildForm(): void {
		this.form = new FormGroup({
			nickname: new FormControl<string>('', Validators.required),
		});
	}

	public onDeleteUserCommunity(communityId: number): void {
		this.deleteUserCommunity.emit(communityId);
	}

	public onShowCommunity(communityId: number) {
		this.showCommunity.emit(communityId);
	}
}
