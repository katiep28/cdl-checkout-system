import React from 'react';
// import logo from './logo.svg';
import AddItem from './AddItem';
import ListItem from './ListItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {
    shoppingBasket: [],
    totalCost: 0
  }

  addToBasket = (itemToAddObj) => {

    let savingsTotal = 0;
    let basketTotal = 0;

    //Make a copy of the tasks array. Doing a this.state.tasks.push
    //to access it direactly as this causeses problems

    const shoppingBasketCopy = this.state.shoppingBasket.slice();

    // First if there is an offer row in the array remove it
    // This needs to be recalculated each time an item is added
    if (shoppingBasketCopy.length > 1) {

      const lastItem = shoppingBasketCopy.length - 1;

      if (shoppingBasketCopy[lastItem].name === "Savings") {
        shoppingBasketCopy.pop();
      }
    }

    //Before we add the new item we need to check if it alread exists in the basket
    //If it does we need to increase the qty rather than add a new row

    const itemExists = shoppingBasketCopy.filter(item => item.name === itemToAddObj.name);

    if (itemExists.length > 0) {
      shoppingBasketCopy.forEach(item => {
        if (item.name === itemToAddObj.name) {
          item.qty = (item.qty * 1) + (itemToAddObj.qty * 1);
          item.itemTotal = item.qty * item.price;
        }
      });
    }
    else {
      shoppingBasketCopy.push(itemToAddObj);
    }

    //Loop through shopping basket to apply any offers or discounts
    // and calculate the basket total.

    shoppingBasketCopy.forEach(item => {
      basketTotal = basketTotal + item.itemTotal;
      //Check the type of offer
      if (item.offer.type === "multibuy") {
        //Check if the item qualifies for the offer
        if (item.qty >= item.offer.qualqty) {
          const factor = Math.trunc(item.qty / item.offer.qualqty);
          savingsTotal = savingsTotal + (item.offer.discount * factor);
        }
      }
      if (item.offer.type === "discount") {
        //add proccessing
      }
    });

    // If an offer applies add a Savings row to the end of the array
    if (savingsTotal > 0) {
      savingsTotal = savingsTotal * -1;
      shoppingBasketCopy.push({ name: "Savings", qty: null, itemTotal: savingsTotal });
      basketTotal = basketTotal + savingsTotal;
    }

    this.setState({
      shoppingBasket: shoppingBasketCopy,
      totalCost: basketTotal
    });
  }

  render() {
    // Read JSON file
    const items = pricingData.item;

    return (

      <div className="container">
        <div className="header">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h1> CDL Checkout App</h1>
            </div>
          </div>
        </div>

        <div className="row" paddingbelow>
          <div className="col-12 col-lg-12 border border-secondary border-thick">
            <AddItem addToBasketFunc={this.addToBasket}
              itemArray={items} />
          </div>
        </div>

        <div className="row paddingabove ">
          <div className="col-1 col-lg-4">
            <p align="left">
              Item
            </p>
          </div>
          <div className="col-10 col-lg-4">
            <h4 align="center">
              Quantity
            </h4>
          </div>
          <div className="col-1 col-lg-4">
            <p align="center">
              Item Price
            </p>
          </div>
        </div>
        
        <div className="row paddingbelow ">
          <div className="col-12 col-lg-12 border border-secondary border-thick" >
            <ol className="list-group">
              {this.state.shoppingBasket.map(item => {
                return <ListItem
                  name={item.name}
                  qty={item.qty}
                  itemTotal={item.itemTotal}
                  id={item.name}
                  key={item.name}
                />
              })}
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-lg-8" />
          <div className="col-2 col-lg-2">
            <h3>Total</h3>
          </div>
          <div className="col-2 col-lg-2">
          <p align="right">
            {this.state.totalCost.toLocaleString("en",{style: "currency", currency:"GBP"})}
          </p>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
