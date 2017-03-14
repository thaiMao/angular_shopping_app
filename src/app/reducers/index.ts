import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose'
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromIngredients from './ingredients';
import * as fromTracker from './tracker';
import * as fromOrder from './order';
import * as fromDashboard from './dashboard';

export interface State {
  ingredientsPrefetched: fromIngredients.State;
  tracker: fromTracker.State;
  order: fromOrder.State;
  dashboard: fromDashboard.State;
}

const reducers = {
  ingredientsPrefetched: fromIngredients.reducer,
  tracker: fromTracker.reducer,
  order: fromOrder.reducer,
  dashboard: fromDashboard.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}

export const getIngredientsPrefetchedState = (state: State) => state.ingredientsPrefetched;
export const getIngredientsPrefetched = createSelector(getIngredientsPrefetchedState,
                                                       fromIngredients.getIngredientsPrefetched);

export const getTrackerState = (state: State) => state.tracker;
export const getTrackerAddedToCart = createSelector(getTrackerState,
                                                       fromTracker.getTrackerAddedToCart);
export const getTrackerSearchedTerms = createSelector(getTrackerState,
                                                       fromTracker.getTrackerSearchedTerms);

export const getTrackerSessionId = createSelector(getTrackerState,
                                                       fromTracker.getTrackerSessionId);

export const getOrderState = (state: State) => state.order;
export const getOrderConfirmed = createSelector(getOrderState,
                                                       fromOrder.getOrderConfirmed);

export const getDashboardState = (state: State) => state.dashboard;
export const getDashboardSales = createSelector(getDashboardState,
                                                       fromDashboard.getSales);
export const getDashboardTopGrossing = createSelector(getDashboardState,
                                                       fromDashboard.getTopGrossing);
export const getDashboardRecentSearches = createSelector(getDashboardState,
                                                       fromDashboard.getRecentSearches);
