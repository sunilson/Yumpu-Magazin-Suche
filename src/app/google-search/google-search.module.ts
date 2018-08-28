import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSearchService } from './google-search.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    GoogleSearchService
  ],
  declarations: []
})
export class GoogleSearchModule { }
