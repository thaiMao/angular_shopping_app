import { type } from '../util';
export var ActionTypes = {
    ADD_ORDER: type('[Order] Add Order')
};
export var AddOrder = (function () {
    function AddOrder(payload) {
        this.payload = payload;
        this.type = ActionTypes.ADD_ORDER;
    }
    return AddOrder;
}());
//# sourceMappingURL=order.js.map