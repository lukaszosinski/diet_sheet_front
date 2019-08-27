import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '../../../../../../app.recuder';
import { Store } from '@ngrx/store';
import * as MealActions from '../../../meal/meal.actions';
import { Observable } from 'rxjs';
import * as fromMeal from '../../../meal/meal.reducer';
import { Meal } from '../../../meal/meal.model';

@Component({
  selector: 'diet-add-meal-dialog',
  template: `
      <p>
          add-meal-dialog works!
      </p>
  `,
  styleUrls: [ './add-meal-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMealDialogComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

}
