import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../../config/translate-module-config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(translateModuleConfig),
  ],
  exports: [
    CommonModule,
    TranslateModule,
  ]
})
export class SharedLazyModule {
}
