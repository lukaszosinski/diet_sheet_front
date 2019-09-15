export interface Summary {
  id?: number;
  kcal: number;
  proteins: number;
  carbs: number;
  fat: number;
  roughage: number;
}

export function summaryEquals(summary1: Summary, summary2: Summary): boolean {
  return (
    summary1.kcal === summary2.kcal &&
    summary1.proteins === summary2.proteins &&
    summary1.carbs === summary2.carbs &&
    summary1.fat === summary2.fat &&
    summary1.roughage === summary2.roughage
  );
}
