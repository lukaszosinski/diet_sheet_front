import { Meal } from './meal';

export interface DayMeal {
  id: number;
  meal: Meal;
  eaten: boolean;
}
