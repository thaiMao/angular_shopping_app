import * as order from '../actions/order';

export interface State {
  orderConfirmed: Object,
};

const initialState = {
  orderConfirmed: {}
};

export const reducer = (state = initialState, action: order.Actions): State => {

  switch(action.type) {
    case order.ActionTypes.ADD_ORDER: {
      return Object.assign({}, state, { orderConfirmed: action.payload });
    }

    default: return state;
  }
}

export const getOrderConfirmed = (state: State) => state.orderConfirmed;


