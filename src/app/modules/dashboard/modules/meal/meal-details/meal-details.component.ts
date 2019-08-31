import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { AppState } from '../../../../../app.recuder';
import { Store } from '@ngrx/store';
import * as fromRouter from '../../../../shared/routing/router.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meal } from '../meal.model';
import * as MealActions from '../meal.actions';


@Component({
  selector: 'diet-meal-details',
  template: `
      <p>Component works!</p>
      {{getMode$() | async}}
  `,
  styleUrls: [ './meal-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDetailsComponent {

  readonly form: FormGroup;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              fb: FormBuilder,
  ) {
    this.form = this.createForm(fb);
    this.store.select(fromRouter.selectRouteParams).pipe(tap(console.log));
  }

  private createForm(fb: FormBuilder): FormGroup {
    return fb.group({});
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

  saveMeal(): void {
    const meal: Meal = this.form.value;
    this.store.dispatch(MealActions.addMeal({ meal }));
  }
}

enum MealDetailsComponentMode {
  EDIT = 'edit',
  CREATE = 'create',
}
