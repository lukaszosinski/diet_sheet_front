import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AppState } from '../../../../../app.recuder';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../meal.model';
import { DietEntityInfoPlaceholderKeys } from '../../../../diet-entity';
import * as MealActions from '../meal.actions';
import * as fromMeals from '../meal.reducer';
import { OnDestroyAbstract } from '../../../../shared/utils/abstract-injectables/on-destroy-abstract';
import { takeUntilDestroy } from '../../../../shared/utils/rxjs-utils';
import { Ingredient } from '../../../../../api/models/ingredient';


@Component({
  selector: 'diet-meal-details',
  template: `
      <form class="meal-details-wrapper" [formGroup]="form">
          <div class="meal-details-header">
              <diet-square-cancel-button (click)="onCancelButtonClick()"></diet-square-cancel-button>
              <diet-square-confirm-button (click)="onConfirmButtonClick()"></diet-square-confirm-button>
          </div>
          <diet-entity-info
                  class="meal-details-info"
                  [placeholderKeys]="MEAL_PLACEHOLDER_KEYS"
                  [infoFormGroup]="form">
          </diet-entity-info>
          <diet-entity-item-table
                  class="meal-details-prices-table"
                  [tableTitle]="'MEAL.INGREDIENTS' | translate"
                  [columnHeaders]="['COMMON.NAME' | translate, 'COMMON.QUANTITY' | translate]"
                  [itemsFormArray]="getIngredientsForm()"
                  (addButtonClick)="onAddIngredientClick()"
                  (deleteClick)="onDeleteIngredientClick($event)"
          >
          </diet-entity-item-table>
          <diet-entity-summary
                  class="meal-details-summary"
                  [summaryFormGroup]="getSummaryForm()"></diet-entity-summary>
      </form>
  `,
  styleUrls: [ './meal-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDetailsComponent extends OnDestroyAbstract implements OnInit {

  readonly MEAL_PLACEHOLDER_KEYS: DietEntityInfoPlaceholderKeys = {
    name: 'MEAL.NAME_PLACEHOLDER',
    description: 'MEAL.DESCRIPTION_PLACEHOLDER',
  };

  readonly form: FormGroup;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private fb: FormBuilder,
  ) {
    super();
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
    return this.fb.group({
      product: [ ingredient && ingredient.product, Validators.required ],
      amount: [ ingredient && ingredient.amount, Validators.required ],
      name: [ ingredient && ingredient.product.name ],
      unit: [ ingredient && ingredient.product.productUnit ]
    });
  }

  ngOnInit(): void {
    this.loadMeal();
    this.patchFormIfMealSelected();
  }

  private loadMeal(): void {
    this.getSelectedMealId$()
      .pipe(filter(mealId => !!mealId))
      .subscribe((id) => this.store.dispatch(MealActions.loadMeal({ id: id! })));
  }

  private patchFormIfMealSelected(): void {
    this.getSelectedMeal$()
      .pipe(takeUntilDestroy(this))
      .subscribe(
        (meal) => {
          this.form.patchValue(meal);
          this.patchIngredientForm(meal);
        }
      );
  }

  private patchIngredientForm(meal: Meal): void {
    const ingredientForm = this.getIngredientsForm();
    ingredientForm.clear();
    meal.ingredients.map(ing => this.createIngredientForm(ing))
      .forEach(ingredient => ingredientForm.push(ingredient));
  }

  getSelectedMeal$(): Observable<Meal> {
    return this.getSelectedMealId$()
      .pipe(
        filter(id => !!id),
        concatMap((id) => this.store.select(fromMeals.selectMealById(id!))),
        filter(meal => !!meal)
      ) as Observable<Meal>;
  }

  getMode$(): Observable<MealDetailsComponentMode> {
    return this.getSelectedMealId$().pipe(
      map((mealId) => !!mealId ? MealDetailsComponentMode.EDIT : MealDetailsComponentMode.CREATE)
    );
  }

  getSelectedMealId$(): Observable<string | undefined> {
    return this.route.params.pipe(
      distinctUntilChanged(),
      map(({ mealId }) => mealId)
    );
  }

  getIngredientsForm(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  getSummaryForm(): FormGroup {
    return this.form.get('summary') as FormGroup;
  }

  onConfirmButtonClick(): void {
    const meal: Meal = this.form.value;
    this.store.dispatch(MealActions.addMeal({ meal }));
  }

  onCancelButtonClick(): void {
    console.log('Cancel button clicked');
  }

  onAddIngredientClick(): void {
    console.log('add ingredient');
  }

  onDeleteIngredientClick(i: number): void {
    this.getIngredientsForm().removeAt(i);
  }
}

enum MealDetailsComponentMode {
  EDIT = 'edit',
  CREATE = 'create',
}
