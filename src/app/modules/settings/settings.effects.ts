import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, flatMap, map, mergeMap, tap } from 'rxjs/operators';

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


  loadUserData$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadUserData),
    mergeMap(() => this.settingsService.getUserData().pipe(
      map((userData) => SettingsActions.loadUserDataSuccess({ userData })),
      catchApiError(SettingsActions.loadUserDataError)
    ))
  ));

  loadPreferences$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.loadPreferences),
    mergeMap(() => this.settingsService.getUserPreferences().pipe(
      map((preferences) => SettingsActions.loadPreferencesSuccess({ preferences })),
      catchApiError(SettingsActions.loadPreferencesError)
    ))
  ));

  updatePreferencesAndUserData$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.updatePreferencesAndUserData),
    mergeMap((action) => this.settingsService.updateUserPreferences(action.preferences).pipe(
      flatMap((preferences) => [
        SettingsActions.updatePreferencesSuccess({ preferences }),
        SettingsActions.updateUserData({ userData: action.userData })
      ]),
      catchApiError(SettingsActions.updatePreferencesAndUserDataError)
    ))
  ));

  updateUserData$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.updateUserData),
    mergeMap((action) => this.settingsService.updateUserData(action.userData).pipe(
      flatMap((userData) => [
        SettingsActions.updateUserDataSuccess({ userData }),
        SettingsActions.loadDietLimits(),
      ]),
      catchApiError(SettingsActions.updatePreferencesAndUserDataError)
    ))
  ));


  updateSettings$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.updateSettings),
    mergeMap((action) => this.settingsService.updateUserDietLimits(action.dietLimits).pipe(
      flatMap((dietLimits) => [
        SettingsActions.updatePreferencesAndUserData({ userData: action.userData, preferences: action.preferences }),
        SettingsActions.updateDietLimitsSuccess({ dietLimits }),
      ]),
      catchApiError(SettingsActions.updateDietLimitsError)
    ))
  ));


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
