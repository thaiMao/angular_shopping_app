import { Action } from '@ngrx/store';
import { type } from '../util';
import { Ingredient } from '../models/ingredient.model';
export const ActionTypes = {
  INGREDIENTS_PREFETCHED: type('[Ingredients] Ingredients Prefetched')
};

export class IngredientsPrefetched implements Action {
  type = ActionTypes.INGREDIENTS_PREFETCHED

  constructor(public payload: Array<Object>) { }
}

export type Actions
  = IngredientsPrefetched;
