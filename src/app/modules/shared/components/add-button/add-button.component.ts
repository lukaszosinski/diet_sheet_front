import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'diet-add-button',
  template: `
      <button type="button" class="diet-add-button">
          <div class="diet-add-button-icon"></div>
      </button>
  `,
  styleUrls: [ './add-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
}
