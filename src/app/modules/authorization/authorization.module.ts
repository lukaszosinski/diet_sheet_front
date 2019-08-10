import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuthorization from './authorization.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    StoreModule.forFeature(fromAuthorization.authorizationFeatureKey, fromAuthorization.reducer)
  ]
})
export class AuthorizationModule {
}
