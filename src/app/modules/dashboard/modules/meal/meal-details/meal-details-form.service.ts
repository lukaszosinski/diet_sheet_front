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
    const summaryForm = this.fb.group({
      kcal: [ undefined, Validators.required ],
      proteins: [ undefined, Validators.required ],
      carbs: [ undefined, Validators.required ],
      fat: [ undefined, Validators.required ]
    });
    summaryForm.disable();

    return this.fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      unit: undefined,
      summary: summaryForm,
      ingredients: this.fb.array([
        this.createIngredientForm()
      ])
    });
  }

  private createIngredientForm(ingredient?: Ingredient): FormGroup {
    const ingredientForm = this.fb.group({
      product: [ ingredient && ingredient.product, Validators.required ],
      amount: [ ingredient && ingredient.amount, Validators.required ],
      name: [ ingredient && ingredient.product.name ],
      unit: [ ingredient && ingredient.product.productUnit ]
    });
    ingredientForm.get('name')!.disable();
    ingredientForm.get('unit')!.disable();
    return ingredientForm;
  }

  patchForm(meal: Meal): void {
    this.form.patchValue(meal);
    this.patchIngredientForm(meal);
  }

  private patchIngredientForm(meal: Meal): void {
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

  removeIngredient(ingredientIndex: number): void {
    this.getIngredientsForm().removeAt(ingredientIndex);
  }

  getMealFromValue(): Meal {
    console.log(this.form.value);
    return this.form.value;
  }
}
