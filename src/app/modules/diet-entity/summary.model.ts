export interface Summary {
  id?: number;
  kcal: number;
  proteins: number;
  carbs: number;
  sugar: number;
  fat: number;
  saturatedFat: number;
  salt: number;
  roughage: number;
  potassium: number;
  calcium: number;
  vitaminD: number;
  vitaminC: number;
}

export function summaryEquals(summary1: Summary, summary2: Summary): boolean {
  return (
    summary1.kcal === summary2.kcal &&
    summary1.proteins === summary2.proteins &&
    summary1.carbs === summary2.carbs &&
    summary1.sugar === summary2.sugar &&
    summary1.fat === summary2.fat &&
    summary1.saturatedFat === summary2.saturatedFat &&
    summary1.salt === summary2.salt &&
    summary1.roughage === summary2.roughage &&
    summary1.potassium === summary2.potassium &&
    summary1.calcium === summary2.calcium &&
    summary1.vitaminD === summary2.vitaminD &&
    summary1.vitaminC === summary2.vitaminC
  );
}
