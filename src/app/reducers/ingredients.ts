import * as ingredients from '../actions/ingredients';
import { Ingredient } from '../models/ingredient.model';

export interface State {
  ingredientsPrefetched: Array<Object>;
};

const initialState = {
  ingredientsPrefetched: [{}]
};

export const reducer = (state = initialState, action: ingredients.Actions): State => {

  switch(action.type) {

    case ingredients.ActionTypes.INGREDIENTS_PREFETCHED: {
      return Object.assign({}, state, { ingredientsPrefetched: action.payload });
    }

    default: return state;
  }
}

export const getIngredientsPrefetched = (state: State) => state.ingredientsPrefetched;
