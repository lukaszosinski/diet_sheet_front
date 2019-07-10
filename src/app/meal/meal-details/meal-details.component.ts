import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../../api/models/meal';
import { Ingredient } from '../../api/models/ingredient';


@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {

  @Input() meal: Meal | undefined;
  @Input() updateMode = false;
  @Output() applyRequest = new EventEmitter<Meal>();

  constructor() {
  }

  ngOnInit() {
  }

  update(): void {
    if (this.updateMode) {
      this.applyRequest.emit(this.meal);
    }
    this.updateMode = !this.updateMode;
  }

  deleteIngredient(ingredient: Ingredient): void {
    console.log(ingredient);
  }

}
