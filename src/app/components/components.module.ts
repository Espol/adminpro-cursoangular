import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonnaComponent } from './grafico-donna/grafico-donna.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonnaComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonnaComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
