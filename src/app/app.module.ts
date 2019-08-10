import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { translateModuleConfig } from './config/translate-module-config';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot(translateModuleConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    // TODO rozważyć dodanie @ngrx/router-store
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
