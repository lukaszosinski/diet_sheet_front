import { Summary } from './summary';

export interface Product {
  id?: number;
  name: string;
  nutrients: Summary;
  kcal: number;
}
