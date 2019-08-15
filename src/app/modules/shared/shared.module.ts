import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DietButtonComponent } from './components/diet-button/diet-button.component';
import { SnackBarService } from './snack-bar.service';


@NgModule({
  declarations: [
    DietButtonComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  exports: [
    DietButtonComponent,
  ],
  providers: [
    SnackBarService,
  ]
})
export class SharedModule {
}
