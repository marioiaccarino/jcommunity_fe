import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	public clearLocalStorage(): void {
		localStorage.clear();
	}

	public isEmpty(): boolean {
		return localStorage.length === 0;
	}

	public getObjectByKey(key: string) {
		return JSON.parse(localStorage.getItem(key) || '""');
	}

	public setItem(key: string, object: string): void {
		localStorage.setItem(key, object);
	}

	public getLocalStorage(): Storage {
		return localStorage;
	}
}
