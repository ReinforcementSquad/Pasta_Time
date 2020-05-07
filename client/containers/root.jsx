import React, { Components } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../actions/actions';
import LoginLink from '../components/loginLink.jsx';

function Root(props) {
  const recipes = [];
  for (let i = 0; i < props.recipes.length; i++) {
    recipes.push(<div>{ props.recipes[i].title }</div>);
  }
  return (
    <Fragment>
      <LoginLink />
      <div>{ recipes }</div>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

function mapDispatchToProps(dispatch) {
  return { getRecipes: (...args) => dispatch(getRecipes(...args)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
