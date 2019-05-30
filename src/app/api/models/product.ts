import { Nutrients } from './nutrients';

export interface Product {
  id: number;
  name: string;
  nutrients: Nutrients;
  kcal: number;
}
