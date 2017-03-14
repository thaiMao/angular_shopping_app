import * as tracker from '../actions/tracker';
;
var initialState = {
    id: null,
    searchedTerms: [],
    addedToCart: []
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case tracker.ActionTypes.TRACK_SEARCHED_TERMS: {
            return Object.assign({}, state, { searchedTerms: state.searchedTerms.concat([action.payload]) });
        }
        case tracker.ActionTypes.TRACK_EMPTY_SEARCH_TERMS: {
            return Object.assign({}, state, { searchedTerms: [action.payload] });
        }
        case tracker.ActionTypes.TRACK_ADDED_TO_CART: {
            return Object.assign({}, state, { addedToCart: state.addedToCart.concat([action.payload]).sort() });
        }
        case tracker.ActionTypes.TRACK_REMOVE_ITEM_FROM_CART: {
            return Object.assign({}, state, { addedToCart: state.addedToCart.filter(function (item) { return item.name !== action.payload.name; }) });
        }
        case tracker.ActionTypes.TRACK_EMPTY_CART: {
            return Object.assign({}, state, { addedToCart: action.payload });
        }
        case tracker.ActionTypes.TRACK_UPDATE_CART: {
            var revisedCart = state.addedToCart.filter(function (item) {
                return item.name !== action.payload.name;
            });
            return Object.assign({}, state, { addedToCart: revisedCart.concat([action.payload]).sort() });
        }
        case tracker.ActionTypes.TRACK_UPDATE_QUANTITY: {
            var revisedCart = state.addedToCart.filter(function (item) {
                return item.name !== action.payload.name;
            });
            return Object.assign({}, state, { addedToCart: revisedCart.concat([action.payload]).sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return 0;
                    }
                }) });
        }
        case tracker.ActionTypes.TRACK_REGISTER_ID: {
            return Object.assign({}, state, { id: action.payload });
        }
        default: return state;
    }
};
export var getTrackerSearchedTerms = function (state) { return state.searchedTerms; };
export var getTrackerAddedToCart = function (state) { return state.addedToCart; };
export var getTrackerSessionId = function (state) { return state.id; };
//# sourceMappingURL=tracker.js.map