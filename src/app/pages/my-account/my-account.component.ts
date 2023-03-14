import { Component } from '@angular/core';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { MyAccountRoutingModule } from './my-account-routing.module';

@Component({
	standalone: true,
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss'],
	imports: [MyAccountRoutingModule, CardMenusComponent]
})
export default class MyAccountComponent {}
