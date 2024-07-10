import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import HomeComponent from './features/home/home.component';
import { HeaderComponent } from './core/fragments/layout/header/header.component';
import { User } from './core/store/user/model/user';
import { StorageService } from './core/services/storage.service';
import { SidebarComponent } from './core/fragments/layout/sidebar/sidebar.component';
import LoginComponent from './features/login/login.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		HomeComponent,
		HeaderComponent,
		SidebarComponent,
		LoginComponent,
	],
	templateUrl: 'app.component.html',
})
export default class AppComponent {
	public localUser: User;

	constructor(public readonly storage: StorageService) {
		this.localUser = storage.getObjectByKey('email');
	}

	public saveOnLocalStorage(localUser: User): void {
		this.localUser = localUser;
		this.storage.setItem('email', JSON.stringify(localUser));
	}

	public deleteFromLocalStorage(): void {
		this.localUser = null;
		this.storage.clearLocalStorage();
	}
}
