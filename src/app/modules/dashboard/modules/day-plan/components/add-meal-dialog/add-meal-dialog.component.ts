import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'diet-add-meal-dialog',
  template: `
      <p>
          add-meal-dialog works!
      </p>
  `,
  styleUrls: [ './add-meal-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMealDialogComponent {

}
