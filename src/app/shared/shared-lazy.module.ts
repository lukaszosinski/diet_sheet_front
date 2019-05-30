import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
  ]
})
export class SharedLazyModule {}
