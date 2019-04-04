import {Product} from './product';

export class Meal {
  id: number;
  name: string;
  ingredients: MealIngredient[];
}

class MealIngredient {
  id: number;
  product: Product;
  amount: number;
}
