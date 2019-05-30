import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, Meal } from '../../api/models/meal';


@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {

  @Input() meal: Meal;
  @Input() updateMode: boolean;
  @Output() applyRequest = new EventEmitter<Meal>();

  constructor() { }

  ngOnInit() {
  }

  update(): void {
    if (this.updateMode) {
      this.applyRequest.emit(this.meal);
    }
    this.updateMode = !this.updateMode;
  }

  deleteIngredient(ingredient: Ingredient): void {

  }

}
