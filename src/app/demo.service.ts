import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DemoService {
	constructor() {}

	saludo(): void {
		console.log('HELLO');
	}
}
