import { Meal } from './meal';
import { Summary } from './summary';

export interface Day {
  date: Date;
  meals: Meal[];
  id: number;
  summary: Summary;
}
