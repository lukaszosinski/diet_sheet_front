import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../../app.recuder';
import { Store } from '@ngrx/store';
import * as fromRouter from '../../../../shared/routing/router.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meal } from '../meal.model';
import * as MealActions from '../meal.actions';
import { DietEntityInfoPlaceholderKeys, DietEntityItem } from '../../../../diet-entity';


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
export class MealDetailsComponent {

  readonly MEAL_PLACEHOLDER_KEYS: DietEntityInfoPlaceholderKeys = {
    name: 'MEAL.NAME_PLACEHOLDER',
    description: 'MEAL.DESCRIPTION_PLACEHOLDER',
  };

  readonly form: FormGroup;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              fb: FormBuilder,
  ) {
    this.form = this.createForm(fb);
    this.store.select(fromRouter.selectRouteParams).pipe(tap(console.log));
  }

  private createForm(fb: FormBuilder): FormGroup {
    const summaryForm = fb.group({
      kcal: [ 1323, Validators.required ],
      proteins: [ 43, Validators.required ],
      carbs: [ 12, Validators.required ],
      fat: [ 12, Validators.required ]
    });
    summaryForm.disable();

    return fb.group({
      name: [ undefined, Validators.required ],
      description: undefined,
      unit: undefined,
      summary: summaryForm,
    });
  }

  getMode$(): Observable<MealDetailsComponentMode> {
    return this.getSelectedMealId$().pipe(
      map((mealId) => !!mealId ? MealDetailsComponentMode.EDIT : MealDetailsComponentMode.CREATE)
    );
  }

  getSelectedMealId$(): Observable<number | undefined> {
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
