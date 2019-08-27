import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'diet-add-button',
  template: `
      <button class="diet-add-button" type="button"></button>
  `,
  styleUrls: [ './add-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
