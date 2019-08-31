import { NgModule } from '@angular/core';
import { DietEntitySummaryComponent } from './components/diet-entity-summary/diet-entity-summary.component';
import { DietEntityInfoComponent } from './components/diet-entity-info/diet-entity-info.component';
import { DietEntityItemTableComponent } from './components/diet-entity-item-table/diet-entity-item-table.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';

const components: any[] = [
  DietEntitySummaryComponent,
  DietEntityInfoComponent,
  DietEntityItemTableComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    SharedLazyModule,
  ],
  exports: [
    ...components,
  ],
  providers: []
})
export class DietEntityModule {
}
