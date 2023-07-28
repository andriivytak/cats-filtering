import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CatsBreedResponseModel } from '../../models/cats/http-responses/cats-breed-response-model';
import { NamedModel } from '../../models/named-model';
import { HttpService } from './http.service';
import { CatsModel } from '../../models/cats/cats-model';
import { CatsListResponseModel } from '../../models/cats/http-responses/cats-list-response-model';
import { CatsFilterModel } from 'src/core/models/cats/cats-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private httpSerivce: HttpService) {}

  getCatsBreeds(): Observable<NamedModel[]> {
    return this.httpSerivce
      .getRequest<CatsBreedResponseModel[]>('/v1/breeds')
      .pipe(
        map((breeds) =>
          breeds.map((breed) => ({ id: breed.id, name: breed.name }))
        )
      );
  }

  getCategories(): Observable<NamedModel[]> {
    return this.httpSerivce.getRequest<NamedModel[]>('/v1/categories')
  }

  getCats(filters: CatsFilterModel): Observable<CatsModel[]> {
    return this.httpSerivce.getRequest<CatsListResponseModel[]>('/v1/images/search', {
      limit: filters.catsCount,
      breed_ids: filters.catsBreed,
      category_ids: filters.catsCategory
    }).pipe(
        map(cats => cats.map(cat => ({id: cat.id, url: cat.url})))
    );
  }
}
