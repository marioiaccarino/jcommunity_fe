import { User, UserJSON } from '../../user/model/user';
import { Community, CommunityJSON } from '../../community/model/community';
import { Interaction, InteractionJSON } from '../../../model/interaction';
import { Post, PostJSON } from '../../post/model/post';
import { Friendship, FriendshipJSON } from '../../../model/friendship';
import { ActiveModel, Validator } from '../../../model/active.model';

export interface UserCommunityJSON {
	id: number;
	user: UserJSON;
	subscribedCommunity: CommunityJSON;
	nickname: string;
	interactions: InteractionJSON[];
	publishedPosts: PostJSON[];
	sentFriendshipRequests: FriendshipJSON[];
	receivedFriendshipRequests: FriendshipJSON[];
}

const validator = new Validator(
	'UserCommunity',
	[
		'id',
		'user',
		'subscribedCommunity',
		'nickname',
		'interactions',
		'publishedPosts',
		'sentFriendshipRequests',
		'receivedFriendshipRequests',
	],
	['id', 'user', 'nickname']
);

export class UserCommunity extends ActiveModel {
	public id: number;
	public user: User;
	public subscribedCommunity: Community;
	public nickname: string;
	public interactions?: Interaction[];
	public publishedPosts?: Post[];
	public sentFriendshipRequests?: Friendship[];
	public receivedFriendshipRequests?: Friendship[];

	constructor(response: UserCommunityJSON) {
		super(response, validator);
		if (response) {
			this.subscribedCommunity = response.subscribedCommunity
				? Community.fromJSON(response.subscribedCommunity)
				: null;
			this.interactions = response.interactions
				? response.interactions.map((interaction: InteractionJSON) =>
						Interaction.fromJSON(interaction)
					)
				: null;
			this.sentFriendshipRequests = response.sentFriendshipRequests
				? response.sentFriendshipRequests.map(
						(sentFriendshipRequest: FriendshipJSON) =>
							Friendship.fromJSON(sentFriendshipRequest)
					)
				: null;
			this.receivedFriendshipRequests =
				response.receivedFriendshipRequests
					? response.receivedFriendshipRequests.map(
							(receivedFriendshipRequest: FriendshipJSON) =>
								Friendship.fromJSON(receivedFriendshipRequest)
						)
					: null;
			this.publishedPosts = response.publishedPosts
				? response.publishedPosts.map((publishedPost: PostJSON) =>
						Post.fromJSON(publishedPost)
					)
				: null;
		}
	}

	public static fromJSON(response: UserCommunityJSON): UserCommunity {
		return new UserCommunity(response);
	}

	public static toJSON(model: UserCommunity): UserCommunityJSON {
		return <UserCommunityJSON>{
			id: model.id,
			user: model.user != null ? User.toJSON(model.user) : null,
			subscribedCommunity:
				model.subscribedCommunity != null
					? Community.toJSON(model.subscribedCommunity)
					: null,
			nickname: model.nickname,
			interactions: model.interactions
				? model.interactions.map((i) => Interaction.toJSON(i))
				: null,
			publishedPosts: model.publishedPosts
				? model.publishedPosts.map((p) => Post.toJSON(p))
				: null,
			sentFriendshipRequests: model.sentFriendshipRequests
				? model.sentFriendshipRequests.map((f) => Friendship.toJSON(f))
				: null,
			receivedFriendshipRequests: model.receivedFriendshipRequests
				? model.receivedFriendshipRequests.map((f) =>
						Friendship.toJSON(f)
					)
				: null,
		};
	}
}
