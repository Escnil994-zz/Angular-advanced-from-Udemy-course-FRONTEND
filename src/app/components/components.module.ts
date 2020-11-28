import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncrementComponent} from './increment/increment.component';
import {FormsModule} from '@angular/forms';
import { DonutComponent } from './donut/donut.component';


import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    IncrementComponent,
    DonutComponent
  ],
  exports: [
    IncrementComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule {
}
