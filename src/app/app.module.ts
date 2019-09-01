import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from './config/translate-module-config';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './app.recuder';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from './api/api.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiEffects } from './api/api.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthorizationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiModule.forRoot(),
    TranslateModule.forRoot(translateModuleConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ ApiEffects ]),
    SharedModule,
  ],
  providers: [
    ApiModule.getServiceProviders(),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
