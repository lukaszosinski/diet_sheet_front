import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'diet-square-cancel-button',
  template: `
      <button type="button" class="diet-square-cancel-button">
          <div class="diet-square-cancel-button-icon"></div>
      </button>
  `,
  styleUrls: [ './square-cancel-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareCancelButtonComponent {
}
