import * as ingredients from '../actions/ingredients';
;
var initialState = {
    ingredientsPrefetched: [{}]
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ingredients.ActionTypes.INGREDIENTS_PREFETCHED: {
            return Object.assign({}, state, { ingredientsPrefetched: action.payload });
        }
        default: return state;
    }
};
export var getIngredientsPrefetched = function (state) { return state.ingredientsPrefetched; };
//# sourceMappingURL=ingredients.js.map