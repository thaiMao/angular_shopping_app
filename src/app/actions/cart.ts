import { Action } from '@ngrx/store';
import { type } from '../util';
import { Ingredient } from '../models/ingredient.model';

export const ActionTypes = {
  REMOVE_ITEM_FROM_CART: type('[Cart] Remove From Cart')
};


export class RemoveFromCart implements Action {
  type = ActionTypes.REMOVE_ITEM_FROM_CART;

  constructor(public payload: Ingredient) { }
}

export type Actions
  = RemoveFromCart;
