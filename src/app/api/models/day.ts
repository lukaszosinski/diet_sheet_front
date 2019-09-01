import { DayMeal } from './day-meal.model';
import { Summary } from '../../modules/diet-entity/summary.model';

export interface Day {
  id: number;
  date: number;
  dayMeals: DayMeal[];
  summary: Summary;
  eatenMealsSummary: Summary;
}

