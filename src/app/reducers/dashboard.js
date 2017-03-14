import * as dashboard from '../actions/dashboard';
;
var initialState = {
    sales: [],
    topGrossing: [],
    recentSearches: []
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case dashboard.ActionTypes.SALES: {
            return Object.assign({}, state, { sales: action.payload });
        }
        case dashboard.ActionTypes.TOP_GROSSING: {
            return Object.assign({}, state, { topGrossing: action.payload });
        }
        case dashboard.ActionTypes.RECENT_SEARCHES: {
            return Object.assign({}, state, { recentSearches: action.payload });
        }
        default: return state;
    }
};
export var getSales = function (state) { return state.sales; };
export var getTopGrossing = function (state) { return state.topGrossing; };
export var getRecentSearches = function (state) { return state.recentSearches; };
//# sourceMappingURL=dashboard.js.map