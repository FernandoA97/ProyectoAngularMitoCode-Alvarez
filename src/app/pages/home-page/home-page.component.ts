import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { ICardEvent } from '../../commons/components/models/components.interface';
import { IHomeGenres } from '../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';
import { SharedFormCompleteModule } from '../../commons/shared/shared-form-complete.module';

@Component({
	standalone: true,
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [SharedFormCompleteModule, CardEventComponent]
})
export class HomePageComponent implements OnInit, AfterViewInit {
	@ViewChild('cardDummy') cardDummy?: CardEventComponent;

	constructor(private _homeApiService: HomeApiService) {}

	listConcerts: ICardEvent[] = [];
	listGenres: IHomeGenres[] = [];

	cardEventDummy: ICardEvent = {
		date: '20/03/2023',
		description: 'xxxx',
		genre: 'ROCK',
		place: 'ccccc',
		hour: '22:00',
		idEvent: 1,
		price: 200,
		title: 'ESTO ES UN DEMO',
		urlImage: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
	};

	ngOnInit(): void {
		console.log('------->');
		console.log(this.cardDummy);

		this._homeApiService.getHome().subscribe((response) => {
			this.listConcerts = response.getDataCardEvent();
			this.listGenres = response.genres;
		});
	}

	ngAfterViewInit(): void {
		console.log('---ngAfterViewInit---->');
		// setTimeout(() => {
		// 	this.cardDummy!.event = this.cardEventDummy;
		// }, 0);
	}

	clickCard(event: ICardEvent): void {
		console.log('----clickCard-------', event);
	}
}
