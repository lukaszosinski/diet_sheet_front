import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'diet-button',
  template: `
      <div class="diet-button-wrapper">
          <button [type]="type" [disabled]="disabled">
              <ng-content></ng-content>
          </button>
      </div>
  `,
  styleUrls: [ './diet-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietButtonComponent {

  @Input() type: 'submit' | 'button' | 'reset' = 'submit';
  @Input() disabled: boolean = false;
}
