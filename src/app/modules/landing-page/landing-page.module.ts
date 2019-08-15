import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ LandingPageComponent, SignInComponent, SignUpComponent ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedLazyModule,
    SharedModule,
  ]
})
export class LandingPageModule {
}
