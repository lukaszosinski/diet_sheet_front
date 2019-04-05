import {Product} from './product';

export class Meal {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

export class Ingredient {
  id: number;
  product: Product;
  amount: number;
}
