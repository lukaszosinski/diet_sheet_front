import { Ingredient } from './ingredient';

export interface Meal {
  id: number;
  name: string;
  ingredients: Ingredient[];
}
