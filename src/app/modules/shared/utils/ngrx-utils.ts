import { Action, ActionCreator, createAction, props, Store } from '@ngrx/store';
import { BehaviorSubject, of, OperatorFunction, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

export class NgrxUtils {
  static createApiErrorAction(type: string): ApiErrorActionCreator {
    return createAction(type, props<{ error: HttpErrorResponse }>());
  }

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

  static catchApiError(apiErrorActionCreator: ApiErrorActionCreator): OperatorFunction<Action, Action> {
    return catchError((error: HttpErrorResponse) => of(apiErrorActionCreator({ error })));
  }
}

// tslint:disable-next-line:max-line-length
type ApiErrorActionCreator = ActionCreator<string, (props: { error: HttpErrorResponse }) => { error: HttpErrorResponse } & TypedAction<string>>;
