import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path: '', 
  children: [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
]},
  {path: 'stocktaking', component: TableComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
