import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../app.recuder';
import * as MealActions from '../meal.actions';
import * as fromMeal from '../meal.reducer';
import { Meal } from '../meal.model';

@Component({
  selector: 'diet-meal-list',
  template: `
      <div class="diet-meal-list-content">
          <diet-entity-with-summary-list class="diet-entity-with-summary-list"
                                         [dietEntities]="meals$ | async"
                                         (entityClick)="onMealClick($event)"
          ></diet-entity-with-summary-list>
      </div>
  `,
  styleUrls: [ './meal-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealListComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

  onMealClick(): void {
  }
}
