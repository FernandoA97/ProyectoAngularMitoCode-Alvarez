import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';

export const routes: Routes = [
	{
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath,
				loadComponent: () =>
					import('./account-change-password-page/account-change-password-page.component').then(
						(m) => m.AccountChangePasswordPageComponent
					)
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MyAccountRoutingModule {}
