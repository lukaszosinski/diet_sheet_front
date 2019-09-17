import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Summary } from '../../summary.model';
import { takeUntilDestroy } from '../../../shared/utils/rxjs-utils';
import { OnDestroyAbstract } from '../../../shared/utils/abstract-injectables/on-destroy-abstract';

@Component({
  selector: 'diet-entity-full-summary',
  template: `
      <div class="summary-wrapper" [formGroup]="form">
          <h1>{{'SUMMARY.NUTRITIONAL_VALUE' | translate}}</h1>
          <div class="summary-input-wrapper">
              <diet-input *ngFor="let formControlName of formControlNames"
                          [label]="'SUMMARY.LABEL.' + formControlName | translate"
                          [type]="'number'"
                          [readonly]="readonly"
                          [formControlName]="formControlName"
              ></diet-input>
          </div>
      </div>
  `,
  styleUrls: [ './diet-entity-full-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietEntityFullSummaryComponent extends OnDestroyAbstract {

  @Input() readonly: boolean = false;

  @Input() set summary(summary: Summary) {
    this.form.patchValue(summary, { emitEvent: false });
  }

  @Output() valueChange: EventEmitter<Summary> = new EventEmitter<Summary>();
  readonly form: FormGroup;

  constructor(fb: FormBuilder) {
    super();
    this.form = fb.group({
      kcal: [ undefined, [ Validators.required ] ],
      proteins: [ undefined, [ Validators.required ] ],
      carbs: [ undefined, [ Validators.required ] ],
      sugar: [ undefined, [ Validators.required ] ],
      fat: [ undefined, [ Validators.required ] ],
      saturatedFat: [ undefined, [ Validators.required ] ],
      salt: [ undefined, [ Validators.required ] ],
      roughage: [ undefined, [ Validators.required ] ],
      potassium: [ undefined, [ Validators.required ] ],
      calcium: [ undefined, [ Validators.required ] ],
      vitaminD: [ undefined, [ Validators.required ] ],
      vitaminC: [ undefined, [ Validators.required ] ],
    });
    this.form.valueChanges
      .pipe(takeUntilDestroy(this))
      .subscribe((changes) => this.valueChange.emit(changes as Summary));
  }

  get formControlNames(): string[] {
    return Object.keys(this.form.controls);
  }
}
