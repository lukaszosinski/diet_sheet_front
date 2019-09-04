import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meal } from '../meal.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as MealActions from '../meal.actions';
import * as fromMeal from '../meal.reducer';
import { AppState } from '../../../../../app.recuder';
import { Router } from '@angular/router';
import { SelectMealDialogComponentData } from './select-meal-dialog-component-data';

@Component({
  selector: 'diet-select-meal-dialog',
  template: `
      <diet-entity-with-summary-list [dietEntities]="meals$ | async"
                                     (entityClick)="onMealClick($event)"
                                     (addEntity)="onAddMealClick()"
                                     [addButtonTitle]="'MEAL.ADD_MEAL' | translate"
      ></diet-entity-with-summary-list>
  `,
  styleUrls: [ './select-meal-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMealDialogComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) private data: SelectMealDialogComponentData,
              private dialogRef: MatDialogRef<SelectMealDialogComponent>,
              private router: Router,
  ) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

  onMealClick(meal: Meal): void {
    this.dialogRef.close({ meal });
  }

  onAddMealClick(): void {
    const redirectUrl = this.router.url;
    if (this.data.shouldStoreMeal) {
      this.store.dispatch(MealActions.requestMealStore());
    }
    this.store.dispatch(MealActions.redirectToMealDetails({ redirectUrl }));
    this.dialogRef.close();
  }
}

