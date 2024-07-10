import {
	UserCommunity,
	UserCommunityJSON,
} from '../../userCommunity/model/user.community';
import { ActiveModel, Validator } from '../../../model/active.model';
import { model } from '@angular/core';

const validator = new Validator(
	'User',
	[
		'id',
		'firstName',
		'urlImage',
		'email',
		'password',
		'lastName',
		'usersCommunity',
	],
	['id', 'firstName', 'urlImage', 'email', 'lastName']
);

export interface UserJSON {
	id?: number;
	firstName?: string;
	lastName?: string;
	urlImage?: string;
	email: string;
	password: string;
	usersCommunity: UserCommunityJSON[];
}
export class User extends ActiveModel {
	public id: number;
	public firstName: string;
	public lastName: string;
	public urlImage: string;
	public email: string;
	public usersCommunity: UserCommunity[];

	constructor(response: UserJSON) {
		super(response, validator);
		if (response) {
			this.usersCommunity = response.usersCommunity
				? response.usersCommunity.map(
						(userCommunity: UserCommunityJSON) =>
							UserCommunity.fromJSON(userCommunity)
					)
				: [];
		} else {
			this.usersCommunity = [];
		}
	}

	public static fromJSON(response: UserJSON): User {
		return new User(response);
	}

	public static toJSON(model: User): UserJSON {
		return <UserJSON>{
			id: model.id,
			firstName: model.firstName,
			lastName: model.lastName,
			urlImage: model.urlImage,
			email: model.email,
			usersCommunity: model.usersCommunity
				? model.usersCommunity.map((uc) => UserCommunity.toJSON(uc))
				: null,
		};
	}
}
