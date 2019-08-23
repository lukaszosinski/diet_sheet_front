import { Meal } from './meal';
import { Summary } from './summary';

export interface Day {
  date: number;
  meals: Meal[];
  id: number;
  summary: Summary;
}
