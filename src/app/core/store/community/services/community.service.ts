import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunityJSON } from '../model/community';

@Injectable({ providedIn: 'root' })
export class CommunityService {
	public readonly communityBaseURL: string = `http://localhost:8080/jCommunity/community`;

	constructor(private readonly http: HttpClient) {}

	public getAll(): Observable<CommunityJSON[]> {
		return this.http.get<CommunityJSON[]>(`${this.communityBaseURL}`);
	}

	public getCommunityById(communityId: number): Observable<CommunityJSON> {
		return this.http.get<CommunityJSON>(
			`${this.communityBaseURL}/${communityId}`
		);
	}
}
