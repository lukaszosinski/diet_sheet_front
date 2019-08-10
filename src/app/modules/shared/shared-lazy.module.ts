import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../../config/translate-module-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(translateModuleConfig),
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class SharedLazyModule {
}
