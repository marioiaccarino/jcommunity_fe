import {
	UserCommunity,
	UserCommunityJSON,
} from '../store/userCommunity/model/user.community';
import { ActiveModel, Validator } from './active.model';

// FIXME sbaglio o ho visto dei Controller nel BE di questo oggetto? Se per ora non ti serve creare lo stack redux va
// bene, ma predisponi il path. Crea sotto store una cartella "interaction/model" e dentro ci sposti questa classe.
// Se in un futuro crei lo store non devi stare a modificare tutti i punti che importano questo model
export interface FriendshipJSON {
	id: number;
	userCommunityWhoSends: UserCommunityJSON;
	userCommunityWhoReceives: UserCommunityJSON;
	typeOfFriendship: TypeOfFriendship;
	isAccepted: boolean;
}

const validator = new Validator(
	'Friendship',
	[
		'id',
		'userCommunityWhoSends',
		'userCommunityWhoReceive',
		'typeOfFriendship',
		'isAccepted',
	],
	[
		'id',
		'userCommunityWhoSends',
		'userCommunityWhoReceive',
		'typeOfFriendship',
		'isAccepted',
	]
);
export class Friendship extends ActiveModel {
	id?: number;
	userCommunityWhoSends?: UserCommunity;
	userCommunityWhoReceives?: UserCommunity;
	typeOfFriendship?: TypeOfFriendship;
	isAccepted?: boolean;

	constructor(response: FriendshipJSON) {
		super(response, validator);
	}

	public static fromJSON(response: FriendshipJSON): Friendship {
		return new Friendship(response);
	}
	public static toJSON(model: Friendship): FriendshipJSON {
		return <FriendshipJSON>{
			id: model.id,
			typeOfFriendship: model.typeOfFriendship,
			isAccepted: model.isAccepted,
			userCommunityWhoSends:
				model.userCommunityWhoSends != null
					? UserCommunity.toJSON(model.userCommunityWhoSends)
					: null,
			userCommunityWhoReceives:
				model.userCommunityWhoReceives != null
					? UserCommunity.toJSON(model.userCommunityWhoReceives)
					: null,
		};
	}
}

export type TypeOfFriendship = {
	family: string;
	colleagues: string;
	bestFriends: string;
	coupleInLove: string;
	friends: string;
};
