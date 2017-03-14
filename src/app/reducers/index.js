import { createSelector } from 'reselect';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromIngredients from './ingredients';
import * as fromTracker from './tracker';
import * as fromOrder from './order';
import * as fromDashboard from './dashboard';
var reducers = {
    ingredientsPrefetched: fromIngredients.reducer,
    tracker: fromTracker.reducer,
    order: fromOrder.reducer,
    dashboard: fromDashboard.reducer
};
var developmentReducer = compose(storeFreeze, combineReducers)(reducers);
var productionReducer = combineReducers(reducers);
export function reducer(state, action) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}
export var getIngredientsPrefetchedState = function (state) { return state.ingredientsPrefetched; };
export var getIngredientsPrefetched = createSelector(getIngredientsPrefetchedState, fromIngredients.getIngredientsPrefetched);
export var getTrackerState = function (state) { return state.tracker; };
export var getTrackerAddedToCart = createSelector(getTrackerState, fromTracker.getTrackerAddedToCart);
export var getTrackerSearchedTerms = createSelector(getTrackerState, fromTracker.getTrackerSearchedTerms);
export var getTrackerSessionId = createSelector(getTrackerState, fromTracker.getTrackerSessionId);
export var getOrderState = function (state) { return state.order; };
export var getOrderConfirmed = createSelector(getOrderState, fromOrder.getOrderConfirmed);
export var getDashboardState = function (state) { return state.dashboard; };
export var getDashboardSales = createSelector(getDashboardState, fromDashboard.getSales);
export var getDashboardTopGrossing = createSelector(getDashboardState, fromDashboard.getTopGrossing);
export var getDashboardRecentSearches = createSelector(getDashboardState, fromDashboard.getRecentSearches);
//# sourceMappingURL=index.js.map