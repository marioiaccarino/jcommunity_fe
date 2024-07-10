import { UserEffects } from './core/store/user/user.effects';
import { CommunityEffects } from './core/store/community/community.effects';
import { UserCommunityEffects } from './core/store/userCommunity/user.community.effects';
import { PostEffect } from './core/store/post/post.effect';
import { AuthEffects } from './core/store/auth/auth.effect';

export const effects: (
	| typeof UserEffects
	| typeof CommunityEffects
	| typeof UserCommunityEffects
	| typeof PostEffect
	| typeof AuthEffects
)[] = [
	UserEffects,
	CommunityEffects,
	UserCommunityEffects,
	PostEffect,
	AuthEffects,
];
