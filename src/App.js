import React from 'react';
import ListItems from './ListItems';
import ListBasket from './ListBasket';
import DeleteItem from './DeleteItem';
import HandleCheckOut from './HandleCheckOut';
import './App.css';

import uuid from "uuid/dist/v4";

import axios from "axios";

import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {
    shoppingBasket: [],
    totalCost: 0,
    totalSavings:0
  }

  deleteFromBasket = (itemToBeDel) => {

    //Create and Array that does not contain the item that has been delted
    const reducedBasket = this.state.shoppingBasket.filter(item => item.item !== itemToBeDel);
  
    this.applyOffers(reducedBasket);
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

    // If an offer applies calculate the total savings
    if (savingsTotal > 0) {
      savingsTotal = savingsTotal * -1;
      basketTotal = basketTotal + savingsTotal;
    }

    this.setState({
      shoppingBasket: basketArray,
      totalSavings: savingsTotal,
      totalCost: basketTotal
    });

  }

  addToBasket = (itemToAddObj) => {

    let shoppingBasketCopy =[];
    let tempItemQty = 0;

    //Make a copy of the tasks array. Doing a this.state.tasks.push
    //to access it direactly as this causeses problems

    shoppingBasketCopy = this.state.shoppingBasket.slice();

    //Before we add the new item we need to check if it alread exists in the basket
    //If it does we need to increase the qty rather than add a new row

    const itemExists = shoppingBasketCopy.filter(item => item.name === itemToAddObj.name);

    if (itemExists.length > 0) {

      shoppingBasketCopy.forEach(item => {
        if (item.name === itemToAddObj.name) {
          tempItemQty = (item.qty*1)  + (itemToAddObj.qty*1);
          // If the amount has been reduced to zero then remove from basket
          if (tempItemQty<0) {
            alert("ERROR: Your quantity for this item has gone below zero");
            return;
          }
          if (tempItemQty > 20){
            alert("ERROR: You can only have a quantity of upto 20 for any single item in your basket");
            return;
          }
          if (tempItemQty === 0) {
            this.deleteFromBasket(item.item);
            //(Offers already applied in delete function so do not need to do them again)
          }

          else {
            item.qty = (item.qty*1)  + (itemToAddObj.qty*1);
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
  disableButton = (itemToCheck) => {
  
  let tempArray = [];
    tempArray = this.state.shoppingBasket.filter(item => item.item === itemToCheck);
    if (tempArray.length === 0) {
       return false;
    }
    else {
      return true;
    }
   }
   checkOut = () => {

    //Insert header details for the shopping
    const usershopheaderid = uuid();
    const header = {
      id: usershopheaderid,
      savings: this.state.totalSavings,
      totalcost: this.state.totalCost
    }
    axios.post('https://z46c2yzan8.execute-api.eu-west-2.amazonaws.com/dev/createheader', header)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    //Insert Items into the database
    let i=0;
    this.state.shoppingBasket.forEach(item => {
      i++;
      let itemobj = {
        itemid: i,
        usershopheaderid: usershopheaderid,
        itemname: item.name,
        qty: item.qty,
        price: item.price
      }
      axios.post('https://z46c2yzan8.execute-api.eu-west-2.amazonaws.com/dev/createitems', itemobj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      itemobj={};
  });

    alert("Information: Your order has been placed");
    
    this.setState({
      shoppingBasket: [],
      totalSavings: 0,
      totalCost: 0
    });
   }


  render() {
    // Read JSON file
    const items = pricingData.item;

    return (

      <div className="container">
        <div className="header rounded-pill">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h1>CDL Checkout App</h1>
          </div>
        </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-7 ">
            <p>Select an item to add to your basket</p>
            {/* <br/> */}
          </div>

          <div className="d-none d-lg-block d-xl-block col-1 col-lg-4" align="center">
          <img src={require("./images/shoppingbasket.png")} alt="Shopping Basket"/>
          </div>

          <div className="col-1 col-lg-1"/>
        </div>

        <div className="row paddingabove ">
          <div className="col-4 col-md-5 col-lg-3">
            <p align="left">
              Item 
            </p>
          </div>
          <div className="col-2 col-md-2 col-lg-1">
          <p align="left">
              Price
            </p>
          </div>
          <div className="col-3 col-md-3 col-lg-2">
            <p align="left">
               Qty
            </p>
          </div>
          <div className=" d-none d-lg-block col-1 col-lg-1"></div>
          <div className="d-none d-lg-block col-2 col-lg-2">
            <p align="left">
              Item
            </p>
          </div>
          <div className="d-none d-lg-block col-1 col-lg-1">
            <p align="center">
              Qty
            </p>
          </div>
          <div className="d-none d-lg-block col-1 col-lg-1">
            <p>
              Price
            </p>
          </div>
          <div className="d-none d-lg-block col-1 col-lg-1"/>
        </div>
        
        <div className="row paddingbelow">
        <div className="col-12 col-lg-6 bg-light border border-secondary border-thick rounded">
              <ol className="list-group">
              {items.map(item => {
                return <ListItems
                  addToBasketFunc={this.addToBasket}
                  disableButtonFunc={this.disableButton}
                  item={item.item}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  offer={item.offer}
                  id={item.item}
                  key={item.item}
                />
              })}
            </ol>
        </div>
        <div className="col-12 col-lg-1">
           <img className="mx-auto d-block d-xl-none d-lg-none" src={require("./images/shoppingbasket.png")} alt="Shopping Basket"/>
        </div>
        <div className="col-10 col-lg-4 bg-light text-dark border border-secondary border-thick bg-info rounded" >
        
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
          <div className="d-none d-xl-block d-lg-block col-8 col-lg-7" />
          <div className="col-6 col-lg-2">
            <h3 className="savingsTotal">Savings</h3>
          </div>
          <div className="col-4 col-lg-2">         
          <h3 className="savingsTotal" align="right">
            {this.state.totalSavings.toLocaleString("en",{style: "currency", currency:"GBP"})}
          </h3>
          </div>
          <div className="cd-none d-xl-block col-1 col-lg-1"/>
        </div>

        <div className="row">
          <div className="d-none d-xl-block d-lg-block col-8 col-lg-7" />
          <div className="col-6 col-lg-2">
            <h3>Total</h3>
          </div>
          <div className="col-4 col-lg-2">
          <h3 align="right">
            {this.state.totalCost.toLocaleString("en",{style: "currency", currency:"GBP"})}
          </h3>
          </div>
          <div className="d-none d-xl-block col-1 col-lg-1"/>
        </div>

        <div className="row">
          <div className="d-none d-xl-block d-lg-block col-8 col-lg-7" />
          <div className="col-12 col-lg-5">
              <HandleCheckOut  
                  checkOutFunc={this.checkOut}
                  shoppingBasket={this.state.shoppingBasket}
                  id="1"
                  key="1"
                />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
