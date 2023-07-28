import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
	providedIn: 'root',
})
export class SpinnerStateService {
	private loadingMap: Map<string, boolean> = new Map<string, boolean>();

	constructor(private spinnerService: NgxSpinnerService) {}

	setLoading(loading: boolean, url: string, isError?: boolean): void {
		if (!url) {
			throw new Error(
				'The request URL must be provided to the LoadingService.setLoading function'
			);
		}
		if (loading) {
			this.loadingMap.set(url, loading);
			this.spinnerService.show();
		} else if (!loading && this.loadingMap.has(url)) {
			this.loadingMap.delete(url);
		}
		if (isError) {
			this.spinnerService.hide();
		}
		setTimeout(() => {
			if (this.loadingMap.size === 0) {
				this.spinnerService.hide();
			}
		}, 250);
	}
}
