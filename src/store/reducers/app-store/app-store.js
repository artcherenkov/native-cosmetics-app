import { ActionType } from '../../action';

const initialState = {
  counter: 0
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT: {
      return {...state, counter: state.counter + 1}
    }
    default:
      return state;
  }
};

export { appStore };
