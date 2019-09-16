import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DietButtonComponent } from './components/diet-button/diet-button.component';
import { SnackBarService } from './snack-bar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './components/validation-error/validation-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from './components/select/select.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { InputComponent } from './components/input/input.component';

const components: any[] = [
  DietButtonComponent,
  ValidationMessageComponent,
  SelectComponent,
  InputComponent,
];

const modules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    ...modules,
  ],
  exports: [
    ...components,
    ...modules,
  ],
  providers: [
    SnackBarService,
  ]
})
export class SharedModule {
}
