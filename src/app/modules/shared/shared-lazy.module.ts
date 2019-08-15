import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../../config/translate-module-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(translateModuleConfig),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class SharedLazyModule {
}
