import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTPRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice : 4
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = INGREDIENTPRICES[type] + this.state.totalPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  }

  removeIngredientsHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedIngredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENTPRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls 
        ingredientAdded = {this.addIngredientsHandler} 
        ingredientRemoved = {this.removeIngredientsHandler}
        disabled = {disabledInfo}
        price = {this.state.totalPrice}/>
      </Fragment>
    )
  }
}

export default BurgerBuilder;