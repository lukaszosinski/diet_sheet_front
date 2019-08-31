import { Summary } from '../../../../api/models/summary';

export interface Product {
  id?: number;
  name: string;
  summary: Summary;
}
