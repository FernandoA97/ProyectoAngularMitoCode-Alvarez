import { Component, OnInit, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { IResponseSale } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { MyAccoungPageService } from '../my-account-page.service';
import { DatePipe } from '@angular/common';

@Component({
	standalone: true,
	selector: 'app-account-buy-page',
	templateUrl: './account-buy-page.component.html',
	styleUrls: ['./account-buy-page.component.scss'],
	imports: [RouterModule, MatTableModule, MatTabsModule, MatMenuModule, MatPaginatorModule, SharedFormCompleteModule],
	providers: [MyAccoungPageService, DatePipe]
})
export default class AccountBuyPageComponent implements OnInit {
	private _AccountBuyApiService = inject(SaleApiService);
	private _AccountBuyPageService = inject(MyAccoungPageService);

	ngOnInit(): void {
		this._loadBuy();
	}
	//private _genreApiService = inject(SaleApiService);
	displayedColumns: string[] = [
		'ntransacction',
		'nameEvent',
		'numTikets',
		'saleTot',
		'dateSales',
		'dateEvent',
		'tickets'
	];
	dataSource = new MatTableDataSource<IResponseSale>();

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	private _loadBuy(): void {
		this._AccountBuyApiService.getSalesUser('', 1, 10).subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._AccountBuyPageService.getDataGenres([...this.dataSource.data], response.data);
				} else {
					console.log('nocarganada');
				}
			}
		});
	}
}
