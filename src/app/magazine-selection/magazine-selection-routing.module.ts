import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionSearchFormComponent } from './selection-search-form/selection-search-form.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { FormsModule } from '@angular/forms';
import { MagazineExportComponent } from './magazine-export/magazine-export.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionSearchFormComponent
  },
  {
    path: 'selection',
    component: SelectionPageComponent
  },
  {
    path: 'export',
    component: MagazineExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineSelectionRoutingModule { }
