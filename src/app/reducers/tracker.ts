import * as tracker from '../actions/tracker';
import { Item } from '../models/item.model'

export interface State {
  id: number,
  searchedTerms: Array<string>;
  addedToCart: Array<Object>;
};

const initialState: State = {
  id: null,
  searchedTerms: [],
  addedToCart: []
};

export const reducer = (state = initialState, action: tracker.Actions): State => {

  switch(action.type) {
    case tracker.ActionTypes.TRACK_SEARCHED_TERMS: {
      return Object.assign({}, state, { searchedTerms: [...state.searchedTerms, action.payload] });
    }

    case tracker.ActionTypes.TRACK_EMPTY_SEARCH_TERMS: {
      return Object.assign({}, state, { searchedTerms: [ action.payload] });
    }

    case tracker.ActionTypes.TRACK_ADDED_TO_CART: {
      return Object.assign({}, state, { addedToCart: [...state.addedToCart, action.payload].sort() });
    }

    case tracker.ActionTypes.TRACK_REMOVE_ITEM_FROM_CART: {
      return Object.assign({}, state, { addedToCart: state.addedToCart.filter((item: Item) => item.name !== action.payload.name) });
    }

    case tracker.ActionTypes.TRACK_EMPTY_CART: {
      return Object.assign({}, state, { addedToCart: action.payload });
    }

    case tracker.ActionTypes.TRACK_UPDATE_CART: {
      var revisedCart = state.addedToCart.filter((item: Item) => {
        return item.name !== action.payload.name;
      })
      return Object.assign({}, state, { addedToCart: [...revisedCart, action.payload].sort() });
    }

    case tracker.ActionTypes.TRACK_UPDATE_QUANTITY: {
      var revisedCart = state.addedToCart.filter((item: Item) => {
        return item.name !== action.payload.name;
      })
      return Object.assign({}, state, { addedToCart: [...revisedCart, action.payload].sort(function(a: Item,b: Item) {

        if(a.name < b.name) {
          return 1;
        }

        if(a.name > b.name) {
          return 0;
        }
      } ) });
    }

    case tracker.ActionTypes.TRACK_REGISTER_ID: {
      return Object.assign({}, state, { id: action.payload });
    }

    default: return state;
  }
}

export const getTrackerSearchedTerms = (state: State) => state.searchedTerms;
export const getTrackerAddedToCart = (state: State) => state.addedToCart;
export const getTrackerSessionId = (state: State) => state.id;
