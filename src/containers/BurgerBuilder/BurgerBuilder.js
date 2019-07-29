import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';

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
    totalPrice : 4,
    purchaseable: false,
    purchasing: false
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
    this.updatePurchaseState(updatedIngredients);
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
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el)=> {
      return sum + el;
    }, 0);
    this.setState({ purchaseable: sum > 0 })
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
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary 
          ingredients = {this.state.ingredients} 
          purchaseContinue = {this.purchaseContinueHandler}
          purchaseCancel = {this.purchaseCancelHandler}
          price = {this.state.totalPrice}/>
        </Modal>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls 
        ingredientAdded = {this.addIngredientsHandler} 
        ingredientRemoved = {this.removeIngredientsHandler}
        disabled = {disabledInfo}
        purchaseable = {this.state.purchaseable}
        price = {this.state.totalPrice}
        ordered = {this.purchaseHandler}/>
      </Fragment>
    )
  }
}

export default BurgerBuilder;