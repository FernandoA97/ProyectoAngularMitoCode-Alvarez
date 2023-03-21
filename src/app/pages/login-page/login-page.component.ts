import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES } from '../../commons/config/path-pages';
import { ChannelHeaderService } from '../../commons/services/local/channel-header.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
	readonly title = 'inicio de sesión';

	disabledButton = false;
	showButton = false;

	private _router = inject(Router);
	private _channelHeaderService = inject(ChannelHeaderService);

	// constructor(private _router: Router, private _channelHeaderService: ChannelHeaderService) {}

	clickLogin(): void {
		this._channelHeaderService.showUser(true);
		void this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
	}
}
