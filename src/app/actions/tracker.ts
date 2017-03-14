import { Action } from '@ngrx/store';
import { type } from '../util';
import { Ingredient } from '../models/ingredient.model';
import { Item } from '../models/item.model';

export const ActionTypes = {
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

export class TrackSearchedTerms implements Action {
  type = ActionTypes.TRACK_SEARCHED_TERMS;

  constructor(public payload: string) { }
}

export class TrackAddedToCart implements Action {
  type = ActionTypes.TRACK_ADDED_TO_CART;

  constructor(public payload: Item) { }
}

export class TrackEmptyCart implements Action {
  type = ActionTypes.TRACK_EMPTY_CART;

  constructor(public payload: Array<Object>) { }
}

export class TrackEmptySearchTerms implements Action {
  type = ActionTypes.TRACK_EMPTY_SEARCH_TERMS;

  constructor(public payload: Array<string>) { }
}

export class TrackUpdateCart implements Action {
  type = ActionTypes.TRACK_UPDATE_CART;

  constructor(public payload: Ingredient) { }
}

export class TrackRemoveItemFromCart implements Action {
  type = ActionTypes.TRACK_REMOVE_ITEM_FROM_CART;

  constructor(public payload: Ingredient) { }
}

export class TrackUpdateQuantity implements Action {
  type = ActionTypes.TRACK_UPDATE_QUANTITY;

  constructor(public payload: Ingredient) { }
}

export class TrackCartAtCheckOut implements Action {
  type = ActionTypes.TRACK_CART_AT_CHECK_OUT;

  constructor(public payload: Array<Object>) { }
}

export class TrackRegisterId implements Action {
  type = ActionTypes.TRACK_REGISTER_ID;

  constructor(public payload: number) { }
}

export type Actions
  = TrackSearchedTerms |
    TrackAddedToCart |
    TrackUpdateQuantity |
    TrackUpdateCart |
    TrackRegisterId |
    TrackEmptyCart |
    TrackEmptySearchTerms |
    TrackRemoveItemFromCart;
