import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  SALES: type('[Dashboard] Sales'),
  TOP_GROSSING: type('[Dashboard] Top Grossing'),
  RECENT_SEARCHES: type('[Dashboard] Recent Seaches'),
};

export class Sales implements Action {
  type = ActionTypes.SALES;

  constructor(public payload: Array<{date: any, total: number}>) { }
}

export class TopGrossing implements Action {
  type = ActionTypes.TOP_GROSSING;

  constructor(public payload: Array<{group: string, total: number}>) { }
}

export class RecentSearches implements Action {
  type = ActionTypes.RECENT_SEARCHES;

  constructor(public payload: Array<{date: any, term: string}>) { }
}



export type Actions
  = Sales |
    TopGrossing |
    RecentSearches;
