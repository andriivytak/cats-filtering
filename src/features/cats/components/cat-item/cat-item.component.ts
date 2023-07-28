import { Component, Input } from '@angular/core';
import { CatsModel } from 'src/core/models/cats/cats-model';

@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent {
  @Input() cat: CatsModel;

}
