import { Component, OnInit } from '@angular/core';
import {Meal} from '../meal';
import {MealService} from '../meal.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  meals: Meal[];
  selectedMeal: Meal;

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.getMeals();
  }

  public onSelect(meal: Meal) {
    this.selectedMeal = meal;
  }

  private getMeals() {
    this.mealService.getMeals().subscribe(meals => {
      this.meals = meals;
    })
  }
}
