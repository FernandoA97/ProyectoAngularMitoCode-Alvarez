//#region  GET GENRES
export interface IResponseGenre {
	id: number;
	name: string;
	status: boolean;
}
//#endregion

//#region CREATE GENRE
export interface IRequestCreateUpdateGenre {
	id: number;
	name: string;
	status: boolean;
}
//#endregion
