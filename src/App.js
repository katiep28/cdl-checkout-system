import React from 'react';
// import logo from './logo.svg';
import AddItem from './AddItem';
import ListItem from './ListItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {
    shoppingBasket: []
  }

  
  addToBasket = (itemToAddObj) => {
   
   //Make a copy of the tasks array
   //never do this.state.tasks.push item and access it direactly as this causese
   //a problem
   const shoppingBasketCopy = this.state.shoppingBasket.slice();

   //Before we add the new item we need to check if it alread exists in the basket
   //If it does we need to increase the qty rather than add a new row
   const itemExists = shoppingBasketCopy.filter(item => item.name === itemToAddObj.name);
   
   if (itemExists.length >0){
      shoppingBasketCopy.forEach(item => {
        if (item.name === itemToAddObj.name) {
          item.qty = (item.qty*1) + (itemToAddObj.qty*1)
        }
      });
    }
    else {
      shoppingBasketCopy.push(itemToAddObj);
    }
    
   this.setState({
     shoppingBasket: shoppingBasketCopy
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
            <br/>
            <ol className="list-group">
              {this.state.shoppingBasket.map(item => {
                return <ListItem
                  name={item.name}
                  qty={item.qty}
                  itemTotal={item.price * item.qty}
                  id={item.name}
                  key={item.name}
                />
              })}
            </ol>
          </div>
        </div>





      </div>
    );
  }
}

export default App;
