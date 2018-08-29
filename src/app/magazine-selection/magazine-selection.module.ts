import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormField, MatSelect, MatOption, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule } from '@angular/material';
import { MagazineSelectionRoutingModule } from './magazine-selection-routing.module';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { SelectionSearchFormComponent } from './selection-search-form/selection-search-form.component';
import { YumpuStuffModule } from '../yumpu-stuff/yumpu-stuff.module';
import { FormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';
import { MagazineExportComponent } from './magazine-export/magazine-export.component';

@NgModule({
  imports: [
    CommonModule,
    MagazineSelectionRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    UtilModule
  ],
  declarations: [SelectionPageComponent, SelectionSearchFormComponent, MagazineExportComponent],
  exports: [

  ]
})
export class MagazineSelectionModule { }
