import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

import { filter, map, tap } from 'rxjs/operators';
import { SnackBarService } from '../modules/shared/snack-bar.service';


@Injectable()
export class ApiEffects {

  showApiErrorMessage$ = createEffect(() => this.actions$.pipe(
    map((action: unknown) => (action as { errorMessageKey?: string }).errorMessageKey),
    filter((errorMessageKey) => !!errorMessageKey),
    tap((errorMessageKey) => this.snackBar.open(errorMessageKey as string))
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private snackBar: SnackBarService,
  ) {
  }

}
