import { Summary } from '../../diet-entity/summary.model';

export interface DietLimits {
  id?: number;
  minLimits: Summary;
  maxLimits: Summary;
}
