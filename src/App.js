import React from 'react';
// import logo from './logo.svg';
import ListItems from './ListItems';
import ListBasket from './ListBasket';
import DeleteItem from './DeleteItem';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {
    shoppingBasket: [],
    totalCost: 0
  }

  deleteFromBasket = (itemToBeDel) => {

    let savingsRemovedArray =[];
    //Create and Array that does not contain the item that has been delted
    const reducedBasket = this.state.shoppingBasket.filter(item => item.item !== itemToBeDel);
   
    savingsRemovedArray = this.removeSavingsRow(reducedBasket);
  
    this.applyOffers(savingsRemovedArray);
  }

  removeSavingsRow = (basketArray) => {
    // First if there is an offer row in the array remove it
    // This needs to be recalculated each time an item is added
    if (basketArray.length > 1) {

      const lastItem = basketArray.length - 1;

      if (basketArray[lastItem].name === "Savings") {
        basketArray.pop();
      }
    }
    return basketArray;
}

  applyOffers = (basketArray) => {
    let basketTotal = 0;
    let savingsTotal = 0;
    
    //Loop through shopping basket to apply any offers or discounts
    // and calculate the basket total.
    
    basketArray.forEach(item => {
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
      basketArray.push({ item: "S", name: "Savings", qty: null, itemTotal: savingsTotal });
      basketTotal = basketTotal + savingsTotal;
    }

    this.setState({
      shoppingBasket: basketArray,
      totalCost: basketTotal
    });

  }

  addToBasket = (itemToAddObj) => {

    let shoppingBasketCopy =[];

    // Remove ths savings row from the array
    this.removeSavingsRow(shoppingBasketCopy);

    //Make a copy of the tasks array. Doing a this.state.tasks.push
    //to access it direactly as this causeses problems

    shoppingBasketCopy = this.state.shoppingBasket.slice();

    //Before we add the new item we need to check if it alread exists in the basket
    //If it does we need to increase the qty rather than add a new row

    const itemExists = shoppingBasketCopy.filter(item => item.name === itemToAddObj.name);

    if (itemExists.length > 0) {
      shoppingBasketCopy.forEach(item => {
        if (item.name === itemToAddObj.name) {
          item.qty = item.qty  + itemToAddObj.qty;
          // If the amount has been reduced to zero then remove from basket

          if (item.qty === 0) {
            this.deleteFromBasket(item.item);
            //(Offers already applied so do not need to do them again)
          }
          else {
            item.itemTotal = item.qty * item.price;
            //Apply any offers or discounts
            this.applyOffers(shoppingBasketCopy);
          }
        }
      });
    }
    else {
      shoppingBasketCopy.push(itemToAddObj);
          //Apply any offers or discounts
      this.applyOffers(shoppingBasketCopy);
    }
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

        <div className="row paddingabove ">
          <div className="col-1 col-lg-3">
            <p align="left">
              Item 
            </p>
          </div>
          <div className="col-1 col-lg-1">
          <p align="left">
              Price
            </p>
          </div>
          <div className="col-10 col-lg-1">
            <p align="left">
               Qty
            </p>
          </div>
          <div className="col-10 col-lg-1"></div>
          <div className="col-1 col-lg-2">
            <p align="left">
              Item
            </p>
          </div>
          <div className="col-10 col-lg-1">
            <h4 align="center">
              Qty
            </h4>
          </div>
          <div className="col-1 col-lg-1">
            <p>
              Price
            </p>
          </div>
          <div className="col-1 col-lg-1 align=left">
          <i className="far fa-trash-alt"></i>
        </div>
        </div>
        
        <div className="row paddingbelow">
        <div className="col-12 col-lg-6 border border-secondary border-thick">
              <ol className="list-group">
              {items.map(item => {
                return <ListItems
                  addToBasketFunc={this.addToBasket}
                  item={item.item}
                  name={item.name}
                  price={item.price}
                  offer={item.offer}
                  id={item.item}
                  key={item.item}
                />
              })}
            </ol>
        </div>
        <div className="col-1 col-lg-1"/>
        <div className="col-12 col-lg-4 border border-secondary border-thick" >
            <ol className="list-group">
              {this.state.shoppingBasket.map(item => {
                return <ListBasket
                  name={item.name}
                  qty={item.qty}
                  itemTotal={item.itemTotal}
                  id={item.name}
                  key={item.name}
                />
              })}
            </ol>
          </div>
          <div className="col-1 col-lg-1">
          <ol className="list-group">
              {this.state.shoppingBasket.map(item => {
                return <DeleteItem
                  deleteFromBasketFunc={this.deleteFromBasket}
                  item={item.item}
                  name={item.name}
                  id={item.name}
                  key={item.name}
                />
              })}
            </ol>
          </div>
         </div> 
        <div className="row">
          <div className="col-8 col-lg-7" />
          <div className="col-2 col-lg-2">
            <h3>Total</h3>
          </div>
          <div className="col-2 col-lg-2">
          <p align="right">
            {this.state.totalCost.toLocaleString("en",{style: "currency", currency:"GBP"})}
          </p>
          </div>
          <div className="col-8 col-lg-7" />
        </div>

      </div>
    );
  }
}

export default App;
