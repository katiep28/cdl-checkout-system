import React from 'react';
// import logo from './logo.svg';
import AddItem from './AddItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {}

  addToBasket = (newItem, itemQty) => {

    //Create a new task wtih default status
    let shoppingBasket = [];


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
