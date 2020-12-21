import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncrementComponent} from './increment/increment.component';
import {FormsModule} from '@angular/forms';
import { DonutComponent } from './donut/donut.component';


import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';




@NgModule({
  declarations: [
    IncrementComponent,
    DonutComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementComponent,
    DonutComponent, 
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule {
}
