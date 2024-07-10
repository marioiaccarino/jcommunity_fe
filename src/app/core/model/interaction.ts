import {
	UserCommunity,
	UserCommunityJSON,
} from '../store/userCommunity/model/user.community';
import { Post, PostJSON } from '../store/post/model/post';
import { ActiveModel, Validator } from './active.model';

// FIXME sbaglio o ho visto dei Controller nel BE di questo oggetto? Se per ora non ti serve creare lo stack redux va
// bene, ma predisponi il path. Crea sotto store una cartella "interaction/model" e dentro ci sposti questa classe.
// Se in un futuro crei lo store non devi stare a modificare tutti i punti che importano questo model
export interface InteractionJSON {
	id: number;
	typeOfInteraction: typeOfInteraction;
	post: PostJSON;
	userCommunity: UserCommunityJSON;
}

const validator = new Validator(
	'Interaction',
	['id', 'typeOfInteraction', 'post', 'userCommunity'],
	['id', 'typeOfInteraction']
);
export class Interaction extends ActiveModel {
	id?: number;
	typeOfInteraction?: typeOfInteraction;
	post?: Post;
	userCommunity?: UserCommunity;

	constructor(response: InteractionJSON) {
		super(response, validator);
		if (response) {
			this.post = Post.fromJSON(response.post);
			this.userCommunity = UserCommunity.fromJSON(response.userCommunity);
		}
	}

	public static fromJSON(response: InteractionJSON): Interaction {
		return new Interaction(response);
	}
	public static toJSON(model: Interaction): InteractionJSON {
		return <InteractionJSON>{
			id: model.id,
			typeOfInteraction: model.typeOfInteraction,
			post: model.post != null ? Post.toJSON(model.post) : null,
			userCommunity:
				model.userCommunity != null
					? UserCommunity.toJSON(model.userCommunity)
					: null,
		};
	}
}

export type typeOfInteraction = {
	like: string;
	comment: string;
	share: string;
	repost: string;
};
