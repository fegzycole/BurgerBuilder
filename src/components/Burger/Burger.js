import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient.js/BurgerIngredients';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key = {igKey + i} type = {igKey}/>
    })
  }).reduce((arr, el) => { return arr.concat(el) }, []);

  transformedIngredients = transformedIngredients.length === 0 ? 
  <p>Please, Start adding ingredients</p> :
  transformedIngredients;
  
  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
}

export default burger;
