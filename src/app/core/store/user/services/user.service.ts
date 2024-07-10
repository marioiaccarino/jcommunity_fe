import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ack } from '../../../model/ack.model';
import { User, UserJSON } from '../model/user';
import { JwtJSON } from '../model/jwt';
import { UserSearch } from '../model/user.search';

@Injectable({ providedIn: 'root' })
export class UserService {
	public readonly userBaseURL: string = `http://localhost:8080/jCommunity/user`;

	constructor(private readonly http: HttpClient) {}
	public getAll(): Observable<UserJSON[]> {
		return this.http.get<UserJSON[]>(`${this.userBaseURL}`);
	}
	public get(id: number): Observable<UserJSON> {
		return this.http.get<UserJSON>(`${this.userBaseURL}/${id}`);
	}

	public delete(id: number): Observable<Ack> {
		return this.http.delete<Ack>(`${this.userBaseURL}/${id}`);
	}

	public registerUser(request: User): Observable<JwtJSON> {
		return this.http.post<JwtJSON>(
			`${this.userBaseURL}/register`,
			User.toJSON(request)
		);
	}

	public getUserById(userSearch: UserSearch): Observable<UserJSON> {
		return this.http.put<UserJSON>(
			`${this.userBaseURL}/getUserById`,
			userSearch
		);
	}
}
