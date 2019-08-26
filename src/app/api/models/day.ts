import { Summary } from './summary';
import {DayMeal} from './dayMeal.model';

export interface Day {
  id: number;
  date: number;
  dayMeals: DayMeal[];
  summary: Summary;
  eatenMealsSummary: Summary;
}
