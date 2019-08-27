import { Summary } from '../../../../api/models/summary';
import { Ingredient } from '../../../../api/models/ingredient';

export interface Meal {
  id: number;
  name: string;
  summary: Summary;
  ingredients: Ingredient[];
}
