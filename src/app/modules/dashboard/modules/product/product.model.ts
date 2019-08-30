import { Summary } from '../../../../api/models/summary';

export interface Product {
  id?: number;
  name: string;
  summary: Summary;
}

export function getEmptyProduct(): Product {
  return {
    name: 'Nowy produkt',
    summary: {
      kcal: 0,
      proteins: 0,
      carbs: 0,
      fat: 0,
      roughage: 0
    }
  };
}
