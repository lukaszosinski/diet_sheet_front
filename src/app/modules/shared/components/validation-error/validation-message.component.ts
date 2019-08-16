import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'diet-validation-message',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: ValidationMessageComponent,
    multi: true
  } ],
  template: `
      <ng-container *ngIf="isVisible">
          asdasd
      </ng-container>
  `,
  styleUrls: [ './validation-message.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent implements OnDestroy, ControlValueAccessor {

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
