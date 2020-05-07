import * as types from '../actionTypes/actionTypes';

const initialState = {
  recipes: null
};

async function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_RECIPES:
      await Promise.resolve(fetch('/posts/getPosts')
        .then((res) => res.json())
        .then(({ posts }) => { return { ...state, ...{ recipes: posts } } }));
      break;
    default:
      return state;
  }
}

export default reducer;
