import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../../config/translate-module-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
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
  ]
})
export class SharedLazyModule {
}
