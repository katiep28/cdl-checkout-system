import React from 'react';
// import logo from './logo.svg';
import AddItem from './AddItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {}

  addItem = (newItem, itemQty) => {

    //Create a new task wtih default status
    let shoppingBasket = [];


    this.setState({

    });
  }
  render() {

    const items = pricingData.item;
    return (
      <body>
        <div className="container">
        <div className="header">
          <div className="row">
            <div className="col-12 col-lg-12">
             <h1> CDL Checkout App</h1>
            {console.log(items[1].offer)}
            </div>
        </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 border border-secondary border-thick">
            <AddItem addTaskFunc={this.addItem} />
          </div>
        </div>
</div>
      </body>
    );
  }
}

export default App;
