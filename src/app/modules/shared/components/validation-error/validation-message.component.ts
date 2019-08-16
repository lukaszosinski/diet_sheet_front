import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { VALIDATION_ERRORS_KEYS } from './validation-error-keys';

@Component({
  selector: 'diet-validation-message',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: ValidationMessageComponent,
    multi: true
  } ],
  template: `
      <ng-container *ngIf="isVisible">
          <p *ngFor="let errorKey of errorKeys">
              {{ 'VALIDATION_ERROR.' + errorKey | translate}}
          </p>
      </ng-container>
  `,
  styleUrls: [ './validation-message.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent implements OnDestroy, ControlValueAccessor {

  @Input() errors?: ValidationErrors;

  private mutationObserver: MutationObserver | undefined;
  isVisible: boolean;

  constructor(private elementRef: ElementRef,
              private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.isVisible = this.shouldBeVisible();
    this.checkVisibilityOnDomChanges();
  }

  private checkVisibilityOnDomChanges(): void {
    this.ngZone.runOutsideAngular(() => {
      this.mutationObserver = new MutationObserver(() => {
        const shouldBeVisible = this.shouldBeVisible();
        if (this.isVisible !== shouldBeVisible) {
          this.isVisible = shouldBeVisible;
          this.changeDetectorRef.detectChanges();
        }
      });
      this.mutationObserver.observe(this.elementRef.nativeElement, { attributes: true });
    });
  }

  private shouldBeVisible(): boolean {
    const classList = this.elementRef.nativeElement.classList;
    const isInvalid = classList.contains('ng-invalid');
    const isTouched = classList.contains('ng-touched');
    return isInvalid && isTouched;
  }

  get errorKeys(): string[] {
    if (!this.errors) {
      return [];
    }
    return Object.keys(this.errors)
      .map((key: string) => VALIDATION_ERRORS_KEYS[key] || key);
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  // ControlValueAccessor implementation. The component implements this interface so that one can use [formControlName] directive on it.
  registerOnChange(): void {}

  registerOnTouched(): void {}

  setDisabledState(): void {}

  writeValue(): void {}

}
