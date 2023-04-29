import { Routes } from '@angular/router';
import { PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from '../../commons/config/path-pages';
import { AUTH_GUARD, MAINTENANCE_GUARD } from '../../commons/guards/function.guard';
import MyAccountComponent from './my-account.component';

export const routes: Routes = [
	{
		path: '',
		component: MyAccountComponent,
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.buyAccount.onlyPath,
				title: 'CAMBIAR CONTRASEÑA',
				loadComponent: () => import('./account-buy-page/account-buy-page.component')
			},
			{
				path: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath,
				title: 'CAMBIAR CONTRASEÑA',
				loadComponent: () => import('./account-change-password-page/account-change-password-page.component')
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PATH_MY_ACCOUNT_PAGES.buyAccount.onlyPath
			}
		]
	}
];
