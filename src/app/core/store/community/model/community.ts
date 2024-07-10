import {
	UserCommunity,
	UserCommunityJSON,
} from '../../userCommunity/model/user.community';
import { ActiveModel, Validator } from '../../../model/active.model';

export class CommunityJSON {
	public id: number;
	public name?: string;
	public public: boolean;
	public usersCommunity?: UserCommunityJSON[] | null;
	public urlImage: string;
}

const validator = new Validator(
	'Community',
	['id', 'name', 'public', 'urlImage', 'usersCommunity'],
	['id', 'name', 'public', 'urlImage']
);
export class Community extends ActiveModel {
	public id: number;
	public name?: string;
	public public: boolean;
	public usersCommunity: UserCommunity[];
	public urlImage: string;

	private constructor(response: CommunityJSON) {
		super(response, validator);
		if (response) {
			this.usersCommunity = response.usersCommunity
				? response.usersCommunity.map((value: UserCommunityJSON) =>
						UserCommunity.fromJSON(value)
					)
				: null;
		}
	}

	public static fromJSON(response: CommunityJSON): Community {
		return new Community(response);
	}

	public static toJSON(model: Community): CommunityJSON {
		return <CommunityJSON>{
			id: model.id,
			name: model.name,
			public: model.public,
			urlImage: model.urlImage,
			usersCommunity: model.usersCommunity
				? model.usersCommunity.map((u) => UserCommunity.toJSON(u))
				: null,
		};
	}
}
