import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss'],
	imports: [RouterModule, SharedFormCompleteModule, CardEventComponent]
})
export default class BuyPageComponent {}
