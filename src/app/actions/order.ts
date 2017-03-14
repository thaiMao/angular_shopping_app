import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  ADD_ORDER: type('[Order] Add Order')
};

export class AddOrder implements Action {
  type = ActionTypes.ADD_ORDER;

  constructor(public payload: Object) { }
}



export type Actions
  = AddOrder;
