import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { FormBuilder, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { SessionStorageService } from 'src/app/commons/services/local/storage/storage.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';

@Component({
	standalone: true,
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule]
})
export default class AccountChangePasswordPageComponent implements OnInit {
	ngOnInit(): void {
		console.log(this._sessionStorageService.getItem('email'));
	}

	constructor(private router: Router, private _sessionStorageService: SessionStorageService) {}

	private _formBuilder = inject(FormBuilder);
	private _userApiService = inject(UserApiService);
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);

	userEmai: string = String(this._sessionStorageService.getItem('email'));
	showUser = false;
	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group({
		passwordAnt: [],
		passwordNew: []
	});

	clickreload(): void {
		window.location.reload();
	}

	clickChange(): void {
		console.log(this.formGroup.get('passwordAnt')?.value);
		console.log(this.formGroup.get('passwordNew')?.value);
		if (this.formGroup.valid) {
			const { passwordAnt, passwordNew } = this.formGroup.getRawValue();
			//this.disabledButton = true;
			const x = this._userApiService
				.changePassword({
					newPassword: passwordNew,
					oldPassword: passwordAnt,
					email: this.userEmai
				})
				.subscribe((err) => {
					if (err.success == true) {
						this._confirmBoxEvokeService.success(
							'Succes',
							'Contraseña Actualizada Correctamente\n Volver a iniciar Session',
							'Ok'
						);
					} else {
						console.log('error');
					}
				});
		}
	}
}
