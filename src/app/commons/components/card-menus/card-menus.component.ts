import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ICardMenu } from '../../models/components.interface';

@Component({
	standalone: true,
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss'],
	imports: [CommonModule, RouterModule]
})
export class CardMenusComponent {
	@Input() menus: ICardMenu[] = [];

	clickMenu(menu: ICardMenu): void {
		this._activeMenu(menu);
	}

	private _activeMenu(menu: ICardMenu): void {
		this.menus.forEach((item) => (item.active = false));
		menu.active = true;
	}
}
