export interface UserCommunityCreateJSON {
	loggedUserId: number;
	communityId: number;
	nickname: string;
}

export class UserCommunityCreate {
	public loggedUserId: number;
	public communityId: number;
	public nickname: string;

	public static toJSON(model: UserCommunityCreate): UserCommunityCreateJSON {
		return <UserCommunityCreateJSON>{
			loggedUserId: model.loggedUserId,
			communityId: model.communityId,
			nickname: model.nickname,
		};
	}
}
