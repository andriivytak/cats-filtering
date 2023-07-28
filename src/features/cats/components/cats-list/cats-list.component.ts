import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, switchMap } from 'rxjs';
import { CatsModel } from 'src/core/models/cats/cats-model';
import { NamedModel } from 'src/core/models/named-model';
import { CatsService } from 'src/core/services/http/cats.service';

@UntilDestroy()
@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
})
export class CatsListComponent implements OnInit {
  breedOptions: Observable<NamedModel[]>;
  categoryOptions: Observable<NamedModel[]>;
  catsGroup: FormGroup;
  cats: Observable<CatsModel[]>;
  catsLimit: number[] = Array.from({ length: 20 }, (_, index) => {
    return (index + 1) * 5;
  });
  constructor(private catsService: CatsService, private formBulder: FormBuilder) {
    this.breedOptions = catsService.getCatsBreeds();
    this.categoryOptions = this.catsService.getCategories();
    this.catsGroup = this.formBulder.group({
      catsBreed: [''],
      catsCount: [10],
      catsCategory: ['']
    })
    this.cats = this.catsService.getCats(this.catsGroup.value);
  }

  ngOnInit(): void {
    this.catsGroup.valueChanges.pipe(untilDestroyed(this), map(filters => this.cats = this.catsService.getCats(filters))).subscribe()
  }
}
