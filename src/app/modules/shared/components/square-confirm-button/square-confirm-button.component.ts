import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'diet-square-confirm-button',
  template: `
      <button type="button" class="diet-square-confirm-button">
          <div class="diet-square-confirm-button-icon"></div>
      </button>
  `,
  styleUrls: [ './square-confirm-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareConfirmButtonComponent {
}
