export interface UserCommunityDeleteJSON {
	id: number;
	loggedUserId: number;
	communityId: number;
	nickname: string;
}

export class UserCommunityDelete {
	public id: number;
	public loggedUserId: number;
	public communityId: number;
	public nickname: string;

	public static toJSON(model: UserCommunityDelete): UserCommunityDeleteJSON {
		return <UserCommunityDeleteJSON>{
			id: model.id,
			loggedUserId: model.loggedUserId,
			communityId: model.communityId,
			nickname: model.nickname,
		};
	}
}
