import { Action, createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';

// tslint:disable-next-line:typedef
export function createApiErrorAction(type: string, errorMessageKey?: string) {
  return createAction(type, (error: HttpErrorResponse) => ({ error, errorMessageKey }));
}

export type ApiAction = TypedAction<string> & { error: HttpErrorResponse, errorMessageKey?: string };
export type ApiErrorActionCreator = ReturnType<typeof createApiErrorAction>;

export function catchApiError(apiErrorActionCreator: ApiErrorActionCreator): OperatorFunction<Action, Action> {
  return catchError((error: HttpErrorResponse) => of(apiErrorActionCreator(error)));
}
