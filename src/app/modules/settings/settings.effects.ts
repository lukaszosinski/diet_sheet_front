import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as SettingsActions from './settings.actions';
import { SettingsService } from './settings.service';
import { catchApiError } from '../../api/api.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { SnackBarService } from '../shared/snack-bar.service';
import { RoutingService } from '../shared/routing/routing.service';


@Injectable()
export class SettingsEffects {

  loadDietLimits$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadDietLimits),
    mergeMap(() => this.settingsService.getUserDietLimits().pipe(
      map((dietLimits) => SettingsActions.loadDietLimitsSuccess({ dietLimits })),
      catchError((error: HttpErrorResponse) => {
        return error.status === 404 ? of(SettingsActions.dietLimitsNotFound()) : throwError(error);
      }),
      catchApiError(SettingsActions.loadDietLimitsError)
    ))
  ));

  dietLimitsNotFound = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.dietLimitsNotFound),
    tap(() => this.showDietLimitsNotFoundMessage())
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private settingsService: SettingsService,
              private snackBarService: SnackBarService,
              private routingService: RoutingService,
  ) {}

  private showDietLimitsNotFoundMessage(): void {
    this.snackBarService.open('SETTINGS.DIET_LIMITS_NOT_FOUND', 'SETTINGS.SET_DIET_LIMITS', 10000)
      .onAction()
      .subscribe(() => this.routingService.navigation.dashboard.settings());
  }

}
