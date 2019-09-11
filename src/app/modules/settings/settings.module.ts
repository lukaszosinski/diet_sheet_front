import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './settings.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './settings.effects';
import { SettingsService } from './settings.service';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DietEntityModule } from '../diet-entity/diet-entity.module';


@NgModule({
  declarations: [ SettingsComponent ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromSettings.settingsFeatureKey, fromSettings.reducer),
    EffectsModule.forFeature([ SettingsEffects ]),
    DietEntityModule,
  ],
  providers: [
    SettingsService,
  ]
})
export class SettingsModule {
}

export const routes: Routes = [
  { path: '', component: SettingsComponent }
];
