import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'diet-shopping-list',
  template: `
    <p>
      shopping-list works!
    </p>
  `,
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
