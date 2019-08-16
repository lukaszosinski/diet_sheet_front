import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DietButtonComponent } from './components/diet-button/diet-button.component';
import { SnackBarService } from './snack-bar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './components/validation-error/validation-message.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DietButtonComponent,
    ValidationMessageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    TranslateModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DietButtonComponent,
    ValidationMessageComponent,
  ],
  providers: [
    SnackBarService,
  ]
})
export class SharedModule {
}
