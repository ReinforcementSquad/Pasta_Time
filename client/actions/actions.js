import * as types from '../actionTypes/actionTypes';

export async function getRecipes() {
  const res = await fetch('/posts/getPosts');
  const posts = await res.json();
  return { type: types.GET_RECIPES, payload: { recipes: posts} };
}
