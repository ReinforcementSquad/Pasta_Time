import * as types from '../actionTypes/actionTypes';

const initialState = {
  recipes: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_RECIPES:
      const newState = Object.assign({}, state);
      newState.recipes = action.payload.recipes
      return newState;
    default:
      return state;
  }
}

export default reducer;
