import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../../../config/path-pages';
import { ChannelHeaderService } from './../../../../services/local/channel-header.service';
import { DataUserService } from './../../../../services/local/data-user.service';
import { SessionStorageService } from './../../../../services/local/storage/storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	static ngOnInit: any;
	constructor(
		private _channelService: ChannelHeaderService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router,
		private _dataUserService: DataUserService
	) {}

	readonly loginPath = PATHS_AUTH_PAGES.loginPage.withSlash;
	readonly registerPath = PATHS_AUTH_PAGES.registerPage.withSlash;
	myAccountPath = PATH_MY_ACCOUNT_PAGES.withSlash;

	public showUser = false;

	userName?: string;
	isAdmin?: boolean;

	ngOnInit(): void {
		this._getDataUser();

		this._channelService.channelHeader$.subscribe((value) => {
			if (value) {
				this._getDataUser();
			}
			this.showUser = value;
		});
	}

	private _getDataUser(): void {
		if (!this._dataUserService.isExpiredToken()) {
			this.showUser = true;
			this.userName = this._dataUserService.getFullName()!;
			this.isAdmin = this._dataUserService.isAdmin()!;
		}
	}

	clickLogout(): void {
		this.showUser = false;
		this._sessionStorageService.clear();
		void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
	}
}
