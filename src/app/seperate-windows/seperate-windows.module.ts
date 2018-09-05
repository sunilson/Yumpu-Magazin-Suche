import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeperateWindowsRoutingModule } from './seperate-windows-routing.module';
import { EmbedViewComponent } from './embed-view/embed-view.component';

@NgModule({
  imports: [
    CommonModule,
    SeperateWindowsRoutingModule
  ],
  declarations: [EmbedViewComponent]
})
export class SeperateWindowsModule { }
