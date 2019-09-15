import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { filter, map, tap } from 'rxjs/operators';
import { SnackBarService } from '../modules/shared/snack-bar.service';
import { ApiAction } from './api.actions';


@Injectable()
export class ApiEffects {

  showApiErrorMessage$ = createEffect(() => this.actions$.pipe(
    map((action: Partial<ApiAction>) => action.errorMessageKey),
    filter((errorMessageKey) => !!errorMessageKey),
    tap((errorMessageKey) => this.snackBar.open(errorMessageKey!))
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private snackBar: SnackBarService,
  ) {
  }

}
