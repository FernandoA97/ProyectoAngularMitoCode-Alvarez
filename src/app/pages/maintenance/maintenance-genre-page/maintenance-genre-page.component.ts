import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { IResponseGenre } from '../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { CRUD_METHOD } from '../../../commons/util/enums';
import { MaintenanceGenrePageService } from './maintenance-genre-page.service';

@Component({
	standalone: true,
	selector: 'app-maintenance-genre-page',
	templateUrl: './maintenance-genre-page.component.html',
	styleUrls: ['./maintenance-genre-page.component.scss'],
	imports: [RouterModule, MatTableModule, MatTabsModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule],
	providers: [MaintenanceGenrePageService, DatePipe]
})
export default class MaintenanceGenrePageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

	listGenres: IResponseGenre[] = [];

	//variable para el Tab
	indexTabSaveEvent = 0;

	// variables para la tabla
	displayedColumns: string[] = ['name', 'status', 'action'];
	dataSource = new MatTableDataSource<IResponseGenre>();
	pageSizeOptions: number[] = [2, 4, 6];
	private _rowsPageBack = 4;
	private _numberPageBack = 1;
	private _crudMethod = CRUD_METHOD.SAVE;

	private _genreApiService = inject(GenreApiService);
	private _maintenanceGenrePageService = inject(MaintenanceGenrePageService);

	//#region getters Form
	idField = this._maintenanceGenrePageService.idField;
	titleField = this._maintenanceGenrePageService.titleField;
	statusField = this._maintenanceGenrePageService.statusField;
	//#region

	formGroup = this._maintenanceGenrePageService.formGroup;

	ngOnInit(): void {
		this._loadGeneros();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this._numberPageBack++;
			this._loadGeneros();
		}
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		if (this.formGroup.valid) {
			this._maintenanceGenrePageService.saveEvent(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
				}
				this._loadGeneros();
				window.location.reload();
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idEvent: number): void {
		this._maintenanceGenrePageService.updateForm(idEvent).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveEvent = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idEvent: number): void {
		this._maintenanceGenrePageService.deleteGenre(idEvent).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idEvent);
			}
		});
	}

	private _loadGeneros(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._maintenanceGenrePageService.getDataGenres(
						[...this.dataSource.data],
						response.data
					);
				} else {
					this._numberPageBack--;
				}
			}
		});
	}
}
