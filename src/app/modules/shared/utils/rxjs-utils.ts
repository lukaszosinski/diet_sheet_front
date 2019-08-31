import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function takeUntilDestroy<T>(component: OnDestroy & { onDestroy$?: Subject<void> }): MonoTypeOperatorFunction<T> {
  component.onDestroy$ = component.onDestroy$ || new Subject<void>();
  const currentOnDestroy = component.ngOnDestroy;
  component.ngOnDestroy = () => {
    component.onDestroy$!.next();
    component.onDestroy$!.complete();
    return currentOnDestroy();
  };
  return takeUntil(component.onDestroy$);
}
