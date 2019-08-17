import { Ingredient } from './ingredient';
import {Summary} from "./summary";

export interface Meal {
  id: number;
  name: string;
  summary: Summary
  ingredients: Ingredient[];
}
