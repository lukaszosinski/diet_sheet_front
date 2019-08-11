import { createAction, props, Store } from '@ngrx/store';
import { ApiError } from '../../../api/models/api-error.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

export class NgrxUtils {
  static readonly createApiErrorAction = (type: string) => createAction(type, props<ApiError>());

  static selectAsBehaviourSubject<T>(store: Store<unknown>, subscriber: OnDestroy, ...selectors: any[]): BehaviorSubject<T | undefined> {
    const onDestroy$ = new Subject<void>();
    const currentOnDestroy = subscriber.ngOnDestroy;
    subscriber.ngOnDestroy = () => {
      onDestroy$.next();
      onDestroy$.complete();
      currentOnDestroy();
    };

    const bs = new BehaviorSubject<T | undefined>(undefined);
    store.select(...selectors)
      .pipe(takeUntil(onDestroy$))
      .subscribe((selectedState) => bs.next(selectedState));
    return bs;
  }
}
