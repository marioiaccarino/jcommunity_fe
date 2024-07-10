import {
	UserCommunity,
	UserCommunityJSON,
} from '../../userCommunity/model/user.community';
import { Interaction, InteractionJSON } from '../../../model/interaction';
import { ActiveModel, Validator } from '../../../model/active.model';
import { CommunityJSON } from '../../community/model/community';

export interface PostJSON {
	id: number;
	title: string;
	description: string;
	urlImage: string;
	author: UserCommunityJSON;
	interactions: InteractionJSON[];
}

const validator = new Validator(
	'Post',
	['id', 'title', 'description', 'urlImage'],
	['id', 'title', 'description', 'urlImage', 'author', 'interactions']
);
export class Post extends ActiveModel {
	public id: number;
	public title: string;
	public description: string;
	public urlImage?: string;
	public author: UserCommunity;
	public interactions?: Interaction[];

	constructor(response: PostJSON) {
		super(response, validator);
		if (response) {
			this.author = response.author
				? UserCommunity.fromJSON(response.author)
				: null;
			this.interactions = response.interactions
				? response.interactions.map((value: InteractionJSON) =>
						Interaction.fromJSON(value)
					)
				: null;
		}
	}

	public static fromJSON(response: PostJSON): Post {
		return new Post(response);
	}
	public static toJSON(model: Post): PostJSON {
		return <PostJSON>{
			id: model.id,
			title: model.title,
			description: model.description,
			urlImage: model.urlImage,
			author:
				model.author != null
					? UserCommunity.toJSON(model.author)
					: null,
			interactions: model.interactions
				? model.interactions.map((i) => Interaction.toJSON(i))
				: null,
		};
	}
}
