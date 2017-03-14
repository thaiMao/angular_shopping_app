import * as order from '../actions/order';
;
var initialState = {
    orderConfirmed: {}
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case order.ActionTypes.ADD_ORDER: {
            return Object.assign({}, state, { orderConfirmed: action.payload });
        }
        default: return state;
    }
};
export var getOrderConfirmed = function (state) { return state.orderConfirmed; };
//# sourceMappingURL=order.js.map