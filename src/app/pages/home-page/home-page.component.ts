import { Component, OnInit } from '@angular/core';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent]
})
export class HomePageComponent implements OnInit {
	constructor(private _homeApiService: HomeApiService) {}

	ngOnInit(): void {
		this._homeApiService.getHome().subscribe((response) => {
			console.log(response.genres);
		});
	}
}
