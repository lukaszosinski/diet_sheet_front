import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DietButtonComponent } from './components/diet-button/diet-button.component';
import { SnackBarService } from './snack-bar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './components/validation-error/validation-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from './components/select/select.component';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { InputComponent } from './components/input/input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DEFAULT_FORMAT } from './date-formats';

const components: any[] = [
  DietButtonComponent,
  ValidationMessageComponent,
  SelectComponent,
  InputComponent,
  DateInputComponent,
];

const modules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MomentDateModule,
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
    { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ]
})
export class SharedModule {
}
