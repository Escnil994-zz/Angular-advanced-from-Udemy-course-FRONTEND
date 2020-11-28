import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

//Modules
import {ComponentsModule} from '../components/components.module';
import {SharedModule} from '../shared/shared.module';


import {ProgressComponent} from './progress/progress.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Grafica1Component} from './grafica1/grafica1.component';
import {PagesComponent} from './pages.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    
  ]
})
export class PagesModule {
}
