import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionSearchFormComponent } from './selection-search-form/selection-search-form.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionSearchFormComponent
  },
  {
    path: 'selection',
    component: SelectionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineSelectionRoutingModule { }
