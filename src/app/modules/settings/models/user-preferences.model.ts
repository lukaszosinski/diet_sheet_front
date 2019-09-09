import { DietLimitsCalculationStrategyEnum } from './diet-limits-calculation-strategy.enum';

export interface UserPreferences {
  id?: number;
  strategyEnum: DietLimitsCalculationStrategyEnum;
}
