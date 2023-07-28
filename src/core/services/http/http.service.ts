import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	protected headers = new HttpHeaders();
	private readonly baseUrl = environment.apiUrl;

	constructor(protected http: HttpClient) {}

	public getRequest<T>(url: string,httpParams?:
		| HttpParams
		| {
				[param: string]:
					| string
					| number
					| boolean
					| ReadonlyArray<string | number | boolean>;
		  }, skipError = false): Observable<T> {
		return this.http.get<T>(this.buildUrl(url), {
			headers: this.getHeaders().append('skip', `${skipError}`),
			params: httpParams,
		});
	}

	public postRequest<T>(
		url: string,
		payload: object,
		httpHeaders?: HttpHeaders,
		httpParams?: HttpParams,
		skipError = false
	): Observable<T> {
		const headers = httpHeaders || this.getHeaders();
		return this.http.post<T>(this.buildUrl(url), payload, {
			headers: headers.append('skip', `${skipError}`),
			params: httpParams as HttpParams,
		});
	}

	public putRequest<T>(
		url: string,
		payload: object,
		httpParams?: HttpParams,
		skipError = false
	): Observable<T> {
		return this.http.put<T>(this.buildUrl(url), payload, {
			headers: this.getHeaders().append('skip', `${skipError}`),
			params: httpParams as HttpParams,
		});
	}

	public patchRequest<T>(url: string, payload: object, skipError = false) {
		return this.http.patch<T>(this.buildUrl(url), payload, {
			headers: this.getHeaders().append('skip', `${skipError}`),
		});
	}

	public deleteRequest<T>(
		url: string,
		httpParams?: HttpParams,
		skipError = false
	): Observable<T> {
		return this.http.delete<T>(this.buildUrl(url), {
			headers: this.getHeaders().append('skip', `${skipError}`),
			params: httpParams,
		});
	}

	protected getHeaders(): HttpHeaders {
		return this.headers;
	}

	protected getHeader(key: string): string | null {
		return this.headers.get(key);
	}

	protected setHeader(key: string, value: string): void {
		this.headers = this.headers.set(key, value);
	}

	protected setHeaders(headers: HttpHeaders) {
		for (const header of headers.keys()) {
			this.setHeader(header, headers.get(header)!);
		}
	}

	protected deleteHeader(key: string): void {
		this.headers = this.headers.delete(key);
	}

	protected buildUrl(url: string): string {
		return this.baseUrl + url;
	}
}
