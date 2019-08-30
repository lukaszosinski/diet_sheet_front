import { Component, OnInit } from '@angular/core';
import { MealService } from '../../../../../api/services/meal.service';
import { Meal } from '../meal.model';

@Component({
  selector: 'diet-meals',
  templateUrl: './meals.component.html',
  styleUrls: [ './meals.component.scss' ]
})
export class MealsComponent implements OnInit {

  meals: Meal[] = [];
  selectedMeal: Meal | undefined;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.downloadMeals();
  }

  public onSelect(meal: Meal): void {
    this.selectedMeal = meal;
  }

  private downloadMeals(): void {
    this.mealService.getMeals().subscribe(meals => {
      this.meals = meals;
    });
  }
}
