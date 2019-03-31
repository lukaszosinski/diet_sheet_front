export class Product {
  id: number;
  name: string;
  nutrients: Nutrients;
  kcal: number;

  constructor() {
    this.id = null;
    this.name = '';
    this.nutrients = new Nutrients();
    this.kcal = 0;
  }
}

class Nutrients {
  id: number;
  proteins: number;
  carbs: number;
  fat: number;
  roughage: number;

  constructor() {
    this.id = null;
    this.proteins = 0;
    this.carbs = 0;
    this.fat = 0;
    this.roughage = 0;
  }
}
