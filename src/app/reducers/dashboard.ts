import * as dashboard from '../actions/dashboard';

export interface State {
  sales: Array<{date: any, total: number}>,
  topGrossing: Array<{group: string, total: number}>,
  recentSearches: Array<{date: any, term: string}>
};

const initialState: State = {
  sales: [],
  topGrossing: [],
  recentSearches: []
};

export const reducer = (state = initialState, action: dashboard.Actions): State => {

  switch(action.type) {
    case dashboard.ActionTypes.SALES: {
      return Object.assign({}, state, { sales: action.payload });
    }

    case dashboard.ActionTypes.TOP_GROSSING: {
      return Object.assign({}, state, { topGrossing: action.payload });
    }

    case dashboard.ActionTypes.RECENT_SEARCHES: {
      return Object.assign({}, state, { recentSearches: action.payload });
    }

    default: return state;
  }
}

export const getSales = (state: State) => state.sales;
export const getTopGrossing = (state: State) => state.topGrossing;
export const getRecentSearches = (state: State) => state.recentSearches;


