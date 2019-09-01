import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../../app.recuder';
import * as MealActions from '../meal.actions';
import * as fromMeal from '../meal.reducer';
import { Meal } from '../meal.model';
import { RoutingService } from '../../../../shared/routing/routing.service';

@Component({
  selector: 'diet-meal-list',
  template: `
      <diet-entity-with-summary-list class="diet-entity-with-summary-list"
                                     [dietEntities]="meals$ | async"
                                     (entityClick)="onMealClick($event)"
                                     (addEntity)="onAddMealClick()"
                                     [addButtonTitle]="'MEAL.ADD_MEAL' | translate"
      ></diet-entity-with-summary-list>

  `,
  styleUrls: [ './meal-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealListComponent implements OnInit {

  readonly meals$: Observable<Meal[]>;

  constructor(private store: Store<AppState>,
              private routingService: RoutingService,
  ) {
    this.meals$ = this.store.select(fromMeal.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(MealActions.loadMeals());
  }

  onMealClick(meal: Meal): void {
    this.goToMealDetails(meal.id);
  }

  onAddMealClick(): void {
    this.goToMealDetails();
  }

  private goToMealDetails(id?: number): void {
    this.routingService.navigation.dashboard.meals.details(id);
  }
}
