import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { JwtJSON } from '../../user/model/jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
	public readonly authBaseURL: string = `http://localhost:8080/jCommunity/auth`;
	constructor(private readonly http: HttpClient) {}

	public loginUser(login: Login): Observable<JwtJSON> {
		return this.http.post<JwtJSON>(`${this.authBaseURL}/login`, login);
	}
}
