import React from 'react';
// import logo from './logo.svg';
import AddItem from './AddItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {
    shoppingBasket: []
  }

  // addToBasket = (name, price, qty, offer) => {
    addToBasket = (itemToAddObj) => {
  
  //   let tempItemObj = {name: item,
  //                     qty: qty,
  //                     price: price,
  //                     itemTotal: qty*price
  //  }
    //Create a new task wtih default status
  //  console.log("IN shopping basket" + name + " " + price + " " + qty + " " + offer);
   
   
   //Make a copy of the tasks array
   //never do this.stat.tasks.push item and access it direactly as this causese
   //a problem
   const shoppingBasketCopy = this.state.shoppingBasket.slice();

   console.log("temp Object" + " " + itemToAddObj.name);
   shoppingBasketCopy.push(itemToAddObj);
   console.log("shopping basket size" + " " + shoppingBasketCopy.length);
   this.setState({
     shoppingBasket: shoppingBasketCopy
   });

    this.setState({

    });
  }
  render() {

    const items = pricingData.item;
    return (
  
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="col-12 col-lg-12">
             <h1> CDL Checkout App</h1>
            {console.log(items)}
            </div>
        </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 border border-secondary border-thick">
            <AddItem addToBasketFunc={this.addToBasket}
                     itemArray={items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
