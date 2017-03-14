import { type } from '../util';
export var ActionTypes = {
    TRACK_SEARCHED_TERMS: type('[Track] Searched Terms'),
    TRACK_ADDED_TO_CART: type('[Track] Added To Cart'),
    TRACK_UPDATE_CART: type('[Track] Update Cart'),
    TRACK_UPDATE_QUANTITY: type('[Track] Update Quantity'),
    TRACK_CART_AT_CHECK_OUT: type('[Track] Track Cart At Check Out'),
    TRACK_GET_ID: type('[Track] Track Get Id'),
    TRACK_REGISTER_ID: type('[Track] Track Register Id'),
    TRACK_EMPTY_CART: type('[Track] Track Empty Cart'),
    TRACK_EMPTY_SEARCH_TERMS: type('[Track] Track Empty Search Terms'),
    TRACK_REMOVE_ITEM_FROM_CART: type('[Track] Track Remove Item From Cart')
};
export var TrackSearchedTerms = (function () {
    function TrackSearchedTerms(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_SEARCHED_TERMS;
    }
    return TrackSearchedTerms;
}());
export var TrackAddedToCart = (function () {
    function TrackAddedToCart(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_ADDED_TO_CART;
    }
    return TrackAddedToCart;
}());
export var TrackEmptyCart = (function () {
    function TrackEmptyCart(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_EMPTY_CART;
    }
    return TrackEmptyCart;
}());
export var TrackEmptySearchTerms = (function () {
    function TrackEmptySearchTerms(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_EMPTY_SEARCH_TERMS;
    }
    return TrackEmptySearchTerms;
}());
export var TrackUpdateCart = (function () {
    function TrackUpdateCart(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_UPDATE_CART;
    }
    return TrackUpdateCart;
}());
export var TrackRemoveItemFromCart = (function () {
    function TrackRemoveItemFromCart(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_REMOVE_ITEM_FROM_CART;
    }
    return TrackRemoveItemFromCart;
}());
export var TrackUpdateQuantity = (function () {
    function TrackUpdateQuantity(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_UPDATE_QUANTITY;
    }
    return TrackUpdateQuantity;
}());
export var TrackCartAtCheckOut = (function () {
    function TrackCartAtCheckOut(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_CART_AT_CHECK_OUT;
    }
    return TrackCartAtCheckOut;
}());
export var TrackRegisterId = (function () {
    function TrackRegisterId(payload) {
        this.payload = payload;
        this.type = ActionTypes.TRACK_REGISTER_ID;
    }
    return TrackRegisterId;
}());
//# sourceMappingURL=tracker.js.map