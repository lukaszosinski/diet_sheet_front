import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import * as appState from '../../../app.recuder';

export const routerFeatureKey = fromRouter.DEFAULT_ROUTER_FEATURENAME;

export type State = fromRouter.RouterReducerState<any>;

export const reducer = fromRouter.routerReducer;

const selectRouter = createFeatureSelector<appState.AppState, State>(routerFeatureKey);

export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);
