import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../../config/translate-module-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { SquareCancelButtonComponent } from './components/square-cancel-button/square-cancel-button.component';
import { SquareConfirmButtonComponent } from './components/square-confirm-button/square-confirm-button.component';
import { NoClickBubblingDirective } from './directives/no-click-bubbling.directive';

const components: any[] = [
  AddButtonComponent,
  SquareCancelButtonComponent,
  SquareConfirmButtonComponent,
];

const directives: any[] = [
  NoClickBubblingDirective,
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(translateModuleConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ...components,
    ...directives,
  ]
})
export class SharedLazyModule {
}
