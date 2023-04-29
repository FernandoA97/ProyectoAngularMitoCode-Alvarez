import { STATUS_CRUD } from './../../../commons/util/enums';
import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, Observable, tap } from 'rxjs';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';
import { CRUD_METHOD } from '../../../commons/util/enums';
import {
	IRequestCreateUpdateGenre,
	IResponseGenre
} from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';

@Injectable()
export class MaintenanceGenrePageService {
	private _confirmBoxEvokeService = inject(ConfirmBoxEvokeService);
	private _toastEvokeService = inject(ToastEvokeService);
	private _genreApiService = inject(GenreApiService);
	private _datePipe = inject(DatePipe);
	private _formBuilder = inject(FormBuilder);

	formGroup = this._getFormGroup();

	deleteGenre(idEvent: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Evento?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) => (responseQuestion.success ? this._genreApiService.deleteGenre(idEvent) : EMPTY)),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El evento a sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
		);
	}

	updateForm(idEvent: number): Observable<IResponse<IResponseGenre>> {
		return this._genreApiService.getGenre(idEvent).pipe(
			tap((response) => {
				if (response.success) {
					const eventResponse = response.data;
					this.titleField.setValue(eventResponse.name);
					this.idField.setValue(idEvent);
					this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				}
			})
		);
	}

	getDataGenres(existingData: IResponseGenre[], responseEvents: IResponseGenre[]): IResponseGenre[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseEvents.filter((eventResponse) => {
				return existingData.some((event) => event.id === eventResponse.id);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseEvents);
			} else {
				newArray = existingData
					.filter((event) => {
						return !responseEvents.some((eventResponse) => eventResponse.id === event.id);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los eventos de manera decendente por id, podemos usar la función sort
			return newArray;
		}

		return responseEvents;
	}

	saveEvent(method: CRUD_METHOD): Observable<boolean> {
		return this._confirmBoxEvokeService
			.warning('Genero', '¿Esta seguro de guardar la informaciónaaa?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._getMethod(method, this._getRequest(method)) : EMPTY
				),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}

					return this._succes(false);
				})
			);
	}

	/**
	 * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
	 * @param method
	 * @returns
	 */
	xboll: Boolean | undefined;

	private _getRequest(method: CRUD_METHOD): IRequestCreateUpdateGenre {
		if (this.statusField.value == 1) {
			this.xboll = true;
		} else {
			this.xboll = false;
		}
		const request: IRequestCreateUpdateGenre = <IRequestCreateUpdateGenre>{
			name: this.titleField.value,
			status: this.xboll
		};

		return request;
	}

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateUpdateGenre): Observable<IResponse<number>> {
		const idGenre = this.idField.value as number;

		console.log(idGenre);
		return method === CRUD_METHOD.SAVE
			? this._genreApiService.createGenre(request)
			: this._genreApiService.updateGenre(idGenre, request);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
		});
	}

	//#region  load Form and getters y setters

	private _getFormGroup() {
		return this._formBuilder.nonNullable.group({
			id: [0, Validators.required],
			title: ['', Validators.required],
			status: [1, Validators.required]
		});
	}

	get idField(): FormControl<number | null> {
		return this.formGroup.controls.id;
	}

	get titleField(): FormControl<string> {
		return this.formGroup.controls.title;
	}

	get statusField(): FormControl<number> {
		return this.formGroup.controls.status;
	}

	//#endregion
}
