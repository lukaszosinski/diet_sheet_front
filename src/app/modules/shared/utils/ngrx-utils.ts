import { Action, ActionCreator, createAction, props } from '@ngrx/store';
import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

export function createApiErrorAction(type: string): ApiErrorActionCreator {
  return createAction(type, props<{ error: HttpErrorResponse }>());
}

export function catchApiError(apiErrorActionCreator: ApiErrorActionCreator): OperatorFunction<Action, Action> {
  return catchError((error: HttpErrorResponse) => of(apiErrorActionCreator({ error })));
}

// tslint:disable-next-line:max-line-length
type ApiErrorActionCreator = ActionCreator<string, (props: { error: HttpErrorResponse }) => { error: HttpErrorResponse } & TypedAction<string>>;
