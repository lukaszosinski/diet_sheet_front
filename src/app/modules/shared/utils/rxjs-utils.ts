import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

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

export function takeFirst<T>(observable: Observable<T>): Observable<T> {
  return observable.pipe(first());
}
