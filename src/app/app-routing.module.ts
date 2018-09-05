import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/magazine-selection/magazine-selection.module#MagazineSelectionModule'
    },
    {
        path: 'external',
        loadChildren: 'app/seperate-windows/seperate-windows.module#SeperateWindowsModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
