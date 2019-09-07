import { GranularityEnum } from './granularity.enum';
import { DietEntity } from '../../../diet-entity/diet-entity.model';
import { Summary } from '../../../diet-entity/summary.model';
import { Price } from './price.model';

export interface Product extends DietEntity {
  id?: number;
  name: string;
  summary: Summary;
  description?: string;
  granularity: GranularityEnum;
  prices: Price[];
}
