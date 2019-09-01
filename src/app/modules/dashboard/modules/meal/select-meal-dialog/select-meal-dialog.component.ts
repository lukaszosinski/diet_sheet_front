import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Meal } from '../meal.model';
import { MatDialogRef } from '@angular/material';
import * as MealActions from '../meal.actions';
import * as fromMeal from '../meal.reducer';
import { AppState } from '../../../../../app.recuder';

@Component({
  selector: 'diet-select-meal-dialog',
  template: `
      <diet-entity-with-summary-list [dietEntities]="meals$ | async"
                                     (entityClick)="onMealClick($event)"
      ></diet-entity-with-summary-list>
  `,
  styleUrls: [ './select-meal-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMealDialogComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<SelectMealDialogComponent>
  ) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

  onMealClick(meal: Meal): void {
    this.dialogRef.close({ meal });
  }
}
