import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    AuthorizationModule,
  ]
})
export class SharedModule {
}
