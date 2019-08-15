import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietButtonComponent } from './components/diet-button/diet-button.component';


@NgModule({
  declarations: [
    DietButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DietButtonComponent,
  ]
})
export class SharedModule {
}
