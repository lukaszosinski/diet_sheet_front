import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'diet-shopping-list',
  template: `
    <div class="shopping-list-wrapper">
        <div class="date-inputs-container">
            <input type="date">
            <input type="date">
        </div>
        <div class="shopping-list-content">
        </div>
    </div>
  `,
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
