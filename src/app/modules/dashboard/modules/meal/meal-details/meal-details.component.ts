import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AppState } from '../../../../../app.recuder';
import { Store } from '@ngrx/store';
import { FormArray, FormGroup } from '@angular/forms';
import { Meal } from '../meal.model';
import { DietEntityInfoPlaceholderKeys } from '../../../../diet-entity';
import * as MealActions from '../meal.actions';
import * as fromMeals from '../meal.reducer';
import { takeUntilDestroy } from '../../../../shared/utils/rxjs-utils';
import { MealDetailsFormService } from './meal-details-form.service';
import { Product } from '../../product/product.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SelectProductDialogComponent } from '../../product/select-product-dialog/select-product-dialog.component';


@Component({
  selector: 'diet-meal-details',
  template: `
      <form class="meal-details-wrapper" [formGroup]="form">
          <div class="meal-details-header">
              <diet-square-cancel-button (click)="onCancelButtonClick()"></diet-square-cancel-button>
              <diet-square-confirm-button
                      (click)="onConfirmButtonClick()"
                      *ngIf="!form.disabled">
              </diet-square-confirm-button>
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
  providers: [
    { provide: MealDetailsFormService, useClass: MealDetailsFormService }
  ]
})
export class MealDetailsComponent implements OnInit, OnDestroy {

  readonly MEAL_PLACEHOLDER_KEYS: DietEntityInfoPlaceholderKeys = {
    name: 'MEAL.NAME_PLACEHOLDER',
    description: 'MEAL.DESCRIPTION_PLACEHOLDER',
  };

  readonly form: FormGroup;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private formService: MealDetailsFormService,
              private dialog: MatDialog,
  ) {
    this.form = this.formService.form;
  }

  ngOnInit(): void {
    this.loadMeal();
    this.patchFormOnMealSelected();
  }

  private loadMeal(): void {
    this.getSelectedMealId$()
      .pipe(filter(mealId => !!mealId))
      .subscribe((id) => this.store.dispatch(MealActions.loadMeal({ id: id! })));
  }

  private patchFormOnMealSelected(): void {
    this.getSelectedMeal$()
      .pipe(takeUntilDestroy(this))
      .subscribe((meal) => {
        this.formService.patchForm(meal);
        if (meal.public) {
          this.form.disable();
        }
      });
  }

  private getSelectedMeal$(): Observable<Meal> {
    return this.getSelectedMealId$()
      .pipe(
        filter(id => !!id),
        concatMap((id) => this.store.select(fromMeals.selectMealById(id!))),
        filter(meal => !!meal)
      ) as Observable<Meal>;
  }

  private getSelectedMealId$(): Observable<string | undefined> {
    return this.route.params.pipe(
      distinctUntilChanged(),
      map(({ mealId }) => mealId)
    );
  }

  getIngredientsForm(): FormArray {
    return this.formService.getIngredientsForm();
  }

  getSummaryForm(): FormGroup {
    return this.formService.getSummaryForm();
  }

  onConfirmButtonClick(): void {
    this.getSelectedMealId$()
      .subscribe((mealId) => {
        const meal: Meal = this.formService.getMealFromValue();
        if (!mealId) {
          this.store.dispatch(MealActions.addMealAndRedirect({ meal }));
        } else {
          this.store.dispatch(MealActions.updateMealAndRedirect({ meal: { ...meal, id: Number(mealId) } }));
        }
      });
  }

  onCancelButtonClick(): void {
    this.store.dispatch(MealActions.redirectFromMealDetails({}));
  }

  onAddIngredientClick(): void {
    const dialogRef: MatDialogRef<SelectProductDialogComponent, { product: Product }> = this.dialog.open(SelectProductDialogComponent, {
      width: '70vw',
      height: '70vh'
    });
    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => this.formService.addIngredient({ product: result!.product }));
  }

  onDeleteIngredientClick(i: number): void {
    this.formService.removeIngredient(i);
  }

  ngOnDestroy(): void {
    this.store.dispatch(MealActions.cancelMealStoreRequest());
  }
}
