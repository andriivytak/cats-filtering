import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsListComponent } from './components/cats-list/cats-list.component';

const routes: Routes = [
	{
		path: '',
        component: CatsListComponent,
	},

	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CatsRoutingModule {}
