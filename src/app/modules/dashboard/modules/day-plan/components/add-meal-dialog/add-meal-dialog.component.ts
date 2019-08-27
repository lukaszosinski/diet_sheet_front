import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '../../../../../../app.recuder';
import { Store } from '@ngrx/store';
import * as MealActions from '../../../meal/meal.actions';
import { Observable } from 'rxjs';
import * as fromMeal from '../../../meal/meal.reducer';
import { Meal } from '../../../meal/meal.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'diet-add-meal-dialog',
  template: `
      <ul class="diet-add-meal-dialog-list">
          <li *ngFor="let meal of (meals$ | async)">
              <diet-meal-with-summary
                      class="diet-add-meal-dialog-list-item-content"
                      [meal]="meal"
                      (click)="onAddMeal(meal)"
              ></diet-meal-with-summary>
          </li>
      </ul>
  `,
  styleUrls: [ './add-meal-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMealDialogComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<AddMealDialogComponent>
  ) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

  onAddMeal(meal: Meal): void {
    this.dialogRef.close({ meal });
  }
}
