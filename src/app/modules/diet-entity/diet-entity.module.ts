import { NgModule } from '@angular/core';
import { DietEntitySummaryComponent } from './components/diet-entity-summary/diet-entity-summary.component';
import { DietEntityInfoComponent } from './components/diet-entity-info/diet-entity-info.component';
import { DietEntityItemTableComponent } from './components/diet-entity-item-table/diet-entity-item-table.component';
import { SharedLazyModule } from '../shared/shared-lazy.module';
import { DietEntityWithSummaryComponent } from './components/diet-entity-with-summary/diet-entity-with-summary.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DietEntityWithSummaryListComponent } from './components/diet-entity-with-summary-list/diet-entity-with-summary-list.component';
import { DietEntityFullSummaryComponent } from './components/diet-entity-full-summary/diet-entity-full-summary.component';
import { SharedModule } from '../shared/shared.module';
import { DietExpandableEntitySummaryComponent } from './components/diet-expandable-entity-summary/diet-expandable-entity-summary.component';
import { MatIconModule } from '@angular/material';

const components: any[] = [
  DietEntityInfoComponent,
  DietEntityItemTableComponent,
  DietEntitySummaryComponent,
  SummaryComponent,
  DietEntityWithSummaryComponent,
  DietEntityWithSummaryListComponent,
  DietExpandableEntitySummaryComponent,
];

@NgModule({
  declarations: [
    ...components,
    DietEntityFullSummaryComponent,
  ],
  imports: [
    SharedLazyModule,
    SharedModule,
    MatIconModule,
  ],
  exports: [
    ...components,
    DietEntityFullSummaryComponent,
  ],
  providers: []
})
export class DietEntityModule {
}
