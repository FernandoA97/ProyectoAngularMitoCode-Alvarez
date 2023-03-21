import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
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
	statusBuy: StatusBuy = 'INFO';
	currentDate = new Date();

	clickBuy(statusBuy: StatusBuy): void {
		this.statusBuy = statusBuy;
	}
}
