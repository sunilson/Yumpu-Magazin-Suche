import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormField, MatSelect, MatOption, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatListModule, MatDialogModule, MatDatepickerModule, MAT_DATE_LOCALE, MatSnackBarModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MagazineSelectionRoutingModule } from './magazine-selection-routing.module';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { SelectionSearchFormComponent } from './selection-search-form/selection-search-form.component';
import { YumpuStuffModule } from '../yumpu-stuff/yumpu-stuff.module';
import { FormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';
import { MagazineExportComponent } from './magazine-export/magazine-export.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

@NgModule({
  imports: [
    CommonModule,
    MagazineSelectionRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule,
    UtilModule,
    MatListModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  entryComponents: [AdvancedSearchComponent],
  declarations: [SelectionPageComponent, SelectionSearchFormComponent, MagazineExportComponent, AdvancedSearchComponent],
  exports: [

  ]
})
export class MagazineSelectionModule { }
