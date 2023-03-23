import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { ICardEvent } from '../../commons/models/components.interface';
import { CustomCurrencyPipe } from '../../commons/pipes/custom-currency.pipe';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

type StatusBuy = 'INFO' | 'BUY' | 'VOUCHER';

@Component({
	standalone: true,
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule, CardEventComponent, CustomCurrencyPipe]
})
export default class BuyPageComponent {
	currentDate = new Date();
	statusBuy: StatusBuy = 'INFO';
	cardEvent?: ICardEvent;

	constructor(private _router: Router) {
		this._captureData();
	}

	clickBuy(statusBuy: StatusBuy): void {
		this.statusBuy = statusBuy;
	}

	private _captureData(): void {
		// capturamos los datos del evento seleccionado enviados por la opción "state"
		const navigation = this._router.getCurrentNavigation();
		console.log(navigation?.extras?.state);

		if (navigation?.extras?.state && navigation.extras.state['event']) {
			this.cardEvent = navigation.extras.state['event'] as ICardEvent;
		}

		if (!this.cardEvent) {
			void this._router.navigateByUrl('/');
		}
	}
}
