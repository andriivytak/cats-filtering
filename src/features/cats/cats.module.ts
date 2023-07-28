import { NgModule } from "@angular/core";
import { UIMaterialModule } from "src/core/ui-kits/ui-material.module";
import { CatsListComponent } from "./components/cats-list/cats-list.component";
import { CatsRoutingModule } from "./cats-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CatItemComponent } from './components/cat-item/cat-item.component';

@NgModule({
    imports: [UIMaterialModule, CatsRoutingModule, CommonModule, ReactiveFormsModule],
	declarations: [CatsListComponent, CatItemComponent],

})


export class CatsModule {
}