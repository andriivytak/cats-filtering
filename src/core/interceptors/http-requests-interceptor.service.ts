import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpinnerStateService } from '../services/business/spinner-state.service';

@Injectable({
	providedIn: 'root',
})
export class HttpRequestsInterceptor implements HttpInterceptor {
	constructor(
		private spinnerState: SpinnerStateService
	) {}
	private apiURL = environment.apiUrl;
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this.spinnerState.setLoading(true, request.url);

		return next.handle(request).pipe(
			tap<HttpEvent<any>>((evt: HttpEvent<any>) => {
				if (request.url.includes(this.apiURL)) {
					if (evt instanceof HttpResponse) {
						this.spinnerState.setLoading(false, request.url);
					}
				}
				return evt;
			}),
			catchError((error: HttpErrorResponse) => {
				this.spinnerState.setLoading(false, request.url, true);
				return throwError(() => error);
			})
		);
	}
}
