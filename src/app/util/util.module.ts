import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FormatDatePipe],
  declarations: [FormatDatePipe]
})
export class UtilModule { }
