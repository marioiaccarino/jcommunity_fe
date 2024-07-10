import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Post } from '../../../core/store/post/model/post';
import { Community } from '../../../core/store/community/model/community';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DefaultAlert } from '../../../core/model/alert';

@Component({
	selector: 'app-community',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [JsonPipe, AlertModule, NgIf, NgForOf],
	templateUrl: './community.component.html',
	styleUrl: './community.component.scss',
})
export default class CommunityComponent implements OnInit {
	@Input() public justJoined: boolean = false;
	@Input() public community: Community;
	@Input() public postsFromTheSelectedCommunity: Post[];

	@Output() public wantsToSeeAll: EventEmitter<void> =
		new EventEmitter<void>();

	public alert: DefaultAlert;
	public ngOnInit(): void {
		this.initializeAlert();
	}

	public onClosed() {
		this.justJoined = false;
	}

	private initializeAlert(): void {
		this.alert = new DefaultAlert(
			'Success',
			'just subscribed to '.concat(this.community.name)
		);
	}
}
