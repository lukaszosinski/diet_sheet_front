import { Summary } from './summary';
import { DayMeal } from './day-meal.model';

export interface Day {
  id: number;
  date: number;
  dayMeals: DayMeal[];
  summary: Summary;
  eatenMealsSummary: Summary;
}
