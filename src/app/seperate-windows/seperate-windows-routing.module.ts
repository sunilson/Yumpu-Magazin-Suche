import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmbedViewComponent } from './embed-view/embed-view.component';

const routes: Routes = [
  {
    path: 'embed/:id',
    component: EmbedViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeperateWindowsRoutingModule { }
