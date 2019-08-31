import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AppState } from '../../../../../app.recuder';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../meal.model';
import { DietEntityInfoPlaceholderKeys, DietEntityItem } from '../../../../diet-entity';
import * as MealActions from '../meal.actions';
import * as fromMeals from '../meal.reducer';
import { OnDestroyAbstract } from '../../../../shared/utils/abstract-injectables/on-destroy-abstract';
import { takeUntilDestroy } from '../../../../shared/utils/rxjs-utils';


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
                  [items]="getEntityTableItems$() | async"
                  (addButtonClick)="onAddProductPriceClick()">
          </diet-entity-item-table>
          <diet-entity-summary
                  class="meal-details-summary"
                  [summaryFormGroup]="getSummaryFormGroup()"></diet-entity-summary>
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
              fb: FormBuilder,
  ) {
    super();
    this.form = this.createForm(fb);
  }

  private createForm(fb: FormBuilder): FormGroup {
    const summaryForm = fb.group({
      kcal: [ undefined, Validators.required ],
      proteins: [ undefined, Validators.required ],
      carbs: [ undefined, Validators.required ],
      fat: [ undefined, Validators.required ]
    });
    summaryForm.disable();

    return fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      unit: undefined,
      summary: summaryForm,
    });
  }

  ngOnInit(): void {
    this.loadMeal();
    this.patchFormIfMealSelected();
  }

  loadMeal(): void {
    this.getSelectedMealId$()
      .pipe(filter(mealId => !!mealId))
      .subscribe((id) => this.store.dispatch(MealActions.loadMeal({ id: id! })));
  }

  patchFormIfMealSelected(): void {
    this.getSelectedMeal$()
      .pipe(takeUntilDestroy(this))
      .subscribe(
        (meal) => this.form.patchValue(meal),
      );
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

  getEntityTableItems$(): Observable<DietEntityItem[]> {
    return of([
      { name: 'Kurczak', quantity: '5', unit: 'g' },
      { name: 'Ziemniaki', quantity: '7', unit: 'g' },
    ]);
  }

  onAddProductPriceClick(): void {
    console.log('Add product price');
  }

  getSummaryFormGroup(): FormGroup {
    return this.form.get('summary') as FormGroup;
  }

  onConfirmButtonClick(): void {
    const meal: Meal = this.form.value;
    this.store.dispatch(MealActions.addMeal({ meal }));
  }

  onCancelButtonClick(): void {
    console.log('Cancel button clicked');
  }
}

enum MealDetailsComponentMode {
  EDIT = 'edit',
  CREATE = 'create',
}
