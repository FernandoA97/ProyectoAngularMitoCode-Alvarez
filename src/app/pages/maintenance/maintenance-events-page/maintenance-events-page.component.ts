import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ConcertApiService } from '../../../commons/services/api/concerts/concert-api.service';
import { IResponseGenre } from '../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
	standalone: true,
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	styleUrls: ['./maintenance-events-page.component.scss'],
	imports: [RouterModule, MatTableModule, MatTabsModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule]
})
export default class MaintenanceEventsPageComponent {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	listGenres: IResponseGenre[] = [];

	private _genreApiService = inject(GenreApiService);
	private _formBuilder = inject(FormBuilder);
	private _concertApiService = inject(ConcertApiService);

	// constructor(
	// 	private _genreApiService: GenreApiService,
	// 	private _formBuilder: FormBuilder,
	// 	private _concertApiService: ConcertApiService
	// ) {}

	formGroup = this._loadFormGroup();

	ngOnInit(): void {
		this._loadGenres();
		this._loadEvents();
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		console.log(this.formGroup.getRawValue());
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();
				this.fileNameField.setValue(htmlInput.files![0].name);
				this.imageField.setValue(resultImageFile);
			};
		}
	}

	private _loadEvents(): void {
		this._concertApiService.getListConcerts(1, 5).subscribe((response) => {
			console.log(response);
		});
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.data) {
				this.listGenres = response.data;
			}
		});
	}

	//#region  load Form and getters y setters

	private _loadFormGroup() {
		return this._formBuilder.nonNullable.group({
			id: [0, Validators.required],
			title: ['', Validators.required],
			description: ['', Validators.required],
			date: [new Date(), Validators.required],
			hour: ['', Validators.required],
			ticketsQuantity: [0, Validators.required],
			price: [0, Validators.required],
			place: ['', Validators.required],
			status: [0, Validators.required],
			genre: this._formBuilder.control<number | null>(null),
			image: ['', Validators.required],
			fileName: ['', Validators.required]
		});
	}

	get idField(): FormControl<number | null> {
		return this.formGroup.controls.id;
	}

	get titleField(): FormControl<string> {
		return this.formGroup.controls.title;
	}

	get descriptionField(): FormControl<string> {
		return this.formGroup.controls.description;
	}

	get dateField(): FormControl<Date> {
		return this.formGroup.controls.date;
	}

	get hourField(): FormControl<string> {
		return this.formGroup.controls.hour;
	}

	get ticketsQuantityField(): FormControl<number> {
		return this.formGroup.controls.ticketsQuantity;
	}

	get priceField(): FormControl<number> {
		return this.formGroup.controls.price;
	}

	get placeField(): FormControl<string> {
		return this.formGroup.controls.place;
	}

	get genreField(): FormControl<number | null> {
		return this.formGroup.controls.genre;
	}

	get statusField(): FormControl<number> {
		return this.formGroup.controls.status;
	}

	get imageField(): FormControl<string> {
		return this.formGroup.controls.image;
	}

	get fileNameField(): FormControl<string | null> {
		return this.formGroup.controls.fileName;
	}
	//#endregion
}
