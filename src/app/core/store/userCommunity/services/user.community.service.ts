import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCommunityJSON } from '../model/user.community';
import { UserCommunitySearch } from '../model/user.community.search';
import { UserCommunityCreate } from '../model/user.community.create';
import { UserCommunityDelete } from '../model/user.community.delete';

@Injectable({ providedIn: 'root' })
export class UserCommunityService {
	public readonly userCommunityBaseURL: string = `http://localhost:8080/jCommunity/userCommunity`;

	constructor(private readonly http: HttpClient) {}

	public getAll(): Observable<UserCommunityJSON[]> {
		return this.http.get<UserCommunityJSON[]>(
			`${this.userCommunityBaseURL}`
		);
	}

	public getAllUsersCommunityOfLoggedUser(
		userCommunitySearch: UserCommunitySearch
	): Observable<UserCommunityJSON[]> {
		return this.http.put<UserCommunityJSON[]>(
			`${this.userCommunityBaseURL}/loggedUserId`,
			userCommunitySearch
		);
	}

	public createUserCommunity(
		userCommunityCreate: UserCommunityCreate
	): Observable<UserCommunityJSON> {
		return this.http.post<UserCommunityJSON>(
			`${this.userCommunityBaseURL}/create`,
			UserCommunityCreate.toJSON(userCommunityCreate)
		);
	}

	public deleteUserCommunity(
		userCommunityDelete: UserCommunityDelete
	): Observable<UserCommunityJSON> {
		return this.http.delete<UserCommunityJSON>(
			`${this.userCommunityBaseURL}/${userCommunityDelete.id}`
		);
	}
}
