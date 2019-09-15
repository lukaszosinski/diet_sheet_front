import { SexEnum } from './sex.enum';
import { BMIStatusEnum } from './bmi-status.enum';
import { PhysicalActivityEnum } from './physical-activity.enum';

export interface UserData {
  id?: number;
  age: number;
  height: number;
  weight: number;
  sex: SexEnum;
  bmiStatus: BMIStatusEnum,
  physicalActivity: PhysicalActivityEnum,
}
