import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './translation.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [FormatDatePipe],
  declarations: [FormatDatePipe]
})
export class UtilModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UtilModule,
      providers: [
        TranslationService
      ]
    }
  }
}
