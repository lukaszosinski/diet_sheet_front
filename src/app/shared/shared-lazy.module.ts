import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class SharedLazyModule {
}
