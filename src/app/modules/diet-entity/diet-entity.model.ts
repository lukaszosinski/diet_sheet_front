import { Summary } from './summary.model';

export interface DietEntity {
  id?: number;
  name: string;
  summary: Summary;
  public: boolean;
}
