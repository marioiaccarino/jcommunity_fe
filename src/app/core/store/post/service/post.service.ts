import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostJSON } from '../model/post';
import { PostSearch } from '../model/post.search';

@Injectable({ providedIn: 'root' })
export class PostService {
	public readonly postBaseURL: string = `http://localhost:8080/jCommunity/post`;

	constructor(private readonly http: HttpClient) {}

	public getAllPostsFromUsersCommunityId(
		postSearch: PostSearch
	): Observable<PostJSON[]> {
		return this.http.put<PostJSON[]>(`${this.postBaseURL}`, postSearch);
	}
	public getAllPosts(): Observable<PostJSON[]> {
		return this.http.put<PostJSON[]>(
			`${this.postBaseURL}`,
			new PostSearch()
		);
	}

	public getPostsFromTheSelectedCommunity(
		postSearch: PostSearch
	): Observable<PostJSON[]> {
		return this.http.put<PostJSON[]>(`${this.postBaseURL}`, postSearch);
	}
}
