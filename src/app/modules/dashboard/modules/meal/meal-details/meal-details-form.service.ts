import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../../../../api/models/ingredient';
import { Meal } from '../meal.model';

@Injectable()
export class MealDetailsFormService {

  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const summaryForm = this.createSummaryForm();
    summaryForm.disable();

    return this.fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      summary: summaryForm,
      ingredients: this.fb.array([])
    });
  }

  private createSummaryForm(): FormGroup {
    return this.fb.group({
      kcal: [ undefined, [ Validators.required ] ],
      proteins: [ undefined, [ Validators.required ] ],
      carbs: [ undefined, [ Validators.required ] ],
      sugar: [ undefined, [ Validators.required ] ],
      fat: [ undefined, [ Validators.required ] ],
      saturatedFat: [ undefined, [ Validators.required ] ],
      salt: [ undefined, [ Validators.required ] ],
      roughage: [ undefined, [ Validators.required ] ],
      potassium: [ undefined, [ Validators.required ] ],
      calcium: [ undefined, [ Validators.required ] ],
      vitaminD: [ undefined, [ Validators.required ] ],
      vitaminC: [ undefined, [ Validators.required ] ],
    });
  }

  private createIngredientForm(ingredient?: Ingredient): FormGroup {
    const ingredientForm = this.fb.group({
      product: [ ingredient && ingredient.product, Validators.required ],
      amount: [ ingredient && ingredient.amount, Validators.required ],
      name: [ ingredient && ingredient.product.name ],
      unit: [ ingredient && ingredient.product.granularity ]
    });
    ingredientForm.get('name')!.disable();
    ingredientForm.get('unit')!.disable();
    return ingredientForm;
  }

  patchForm(meal: Meal): void {
    const mealWithUpdatedIngredients = { ...meal, ingredients: meal.ingredients || [] };
    this.form.patchValue(mealWithUpdatedIngredients);
    this.patchIngredientForm(mealWithUpdatedIngredients);
  }

  private patchIngredientForm(meal: Meal & { ingredients: Ingredient[] }): void {
    const ingredientForm = this.getIngredientsForm();
    ingredientForm.clear();
    meal.ingredients.map(ing => this.createIngredientForm(ing))
      .forEach(ingredient => ingredientForm.push(ingredient));
  }

  getIngredientsForm(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  getSummaryForm(): FormGroup {
    return this.form.get('summary') as FormGroup;
  }

  addIngredient(ingredient: Partial<Ingredient>): void {
    this.getIngredientsForm().push(this.createIngredientForm(ingredient as Ingredient));
  }

  removeIngredient(ingredientIndex: number): void {
    this.getIngredientsForm().removeAt(ingredientIndex);
  }

  getMealFromValue(): Meal {
    return this.form.value;
  }

}
