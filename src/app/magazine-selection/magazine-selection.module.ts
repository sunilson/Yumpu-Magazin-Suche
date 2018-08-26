import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormField, MatSelect, MatOption, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { MagazineSelectionRoutingModule } from './magazine-selection-routing.module';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { SelectionSearchFormComponent } from './selection-search-form/selection-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    MagazineSelectionRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [SelectionPageComponent, SelectionSearchFormComponent],
  exports: [

  ]
})
export class MagazineSelectionModule { }
