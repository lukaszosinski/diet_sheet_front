import { Ingredient } from '../../../../api/models/ingredient';
import { DietEntity } from '../../../diet-entity/diet-entity.model';
import { Summary } from '../../../diet-entity/summary.model';

export interface Meal extends DietEntity {
  id: number;
  name: string;
  summary: Summary;
  ingredients: Ingredient[];
}
