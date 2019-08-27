import { Meal } from '../../modules/dashboard/modules/meal/meal.model';

export interface DayMeal {
  id: number;
  meal: Meal;
  eaten: boolean;
}
