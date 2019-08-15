import { Action, ActionCreator, createAction, props, Store } from '@ngrx/store';
import { of, OperatorFunction } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

// tslint:disable-next-line:max-line-length
type ApiErrorActionCreator = ActionCreator<string, (props: { error: HttpErrorResponse }) => { error: HttpErrorResponse } & TypedAction<string>>;

export function createApiErrorAction(type: string): ApiErrorActionCreator {
  return createAction(type, props<{ error: HttpErrorResponse }>());
}

export function catchApiError(apiErrorActionCreator: ApiErrorActionCreator): OperatorFunction<Action, Action> {
  return catchError((error: HttpErrorResponse) => of(apiErrorActionCreator({ error })));
}

export function selectFirst<T, K>(store: Store<T>, selector: (t: T) => K) {
  return store.select<K>(selector).pipe(first());
}
