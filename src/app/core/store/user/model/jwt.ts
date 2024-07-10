import { ActiveModel, Validator } from '../../../model/active.model';

const validator = new Validator(
	'Jwt',
	['token', 'type', 'id', 'username', 'role'],
	['token', 'type', 'id', 'username', 'role']
);

export interface JwtJSON {
	token?: string;
	type?: string;
	id?: number;
	username?: string;
	role?: string;
}
export class Jwt extends ActiveModel {
	public token: string;
	public type: string;
	public id: number;
	public username: string;
	public role: string;

	constructor(response: JwtJSON) {
		super(response, validator);
	}

	public static fromJSON(response: JwtJSON): Jwt {
		return new Jwt(response);
	}

	public static toJSON(model: Jwt): JwtJSON {
		return <JwtJSON>{
			token: model.token,
			type: model.type,
			id: model.id,
			username: model.username,
			role: model.role,
		};
	}
}
