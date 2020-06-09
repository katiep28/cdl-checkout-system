import React from "react";

class ListItems extends React.Component {
  state = {
    itemQty: 1,
    itemToAddObj: {item:"",
                  name:"",
                  price: 0,
                  qty: 0,
                  itemTotal:0,
                  offer: {}
                  }
  }

  updateItemQty = (event) => {
    this.setState({
      itemQty: event.target.value
    })
  }

  hideButton = () => {
    // Do not want to display the minus button if Item is not in the basket
    
    if (this.props.disableButtonFunc(this.props.item)){
      return true;
    }
    else {return false;}
}
  handleMinusClick = () => {
    if (this.state.itemQty === "") {
      alert("ERROR: You must enter a quantity greater than 0 before pressing the Subtract button");
    }
    //Is the item in the shopping Basket ? If not then this is not
    // Need to update the quantity value and the itemTotal in the object
    const tempObj = {item: this.props.item,
                     name: this.props.name,
                     qty: this.state.itemQty * -1,
                     price: this.props.price,
                     itemTotal: Math.round(this.state.itemQty * this.props.price * 100)/100,
                     offer: this.props.offer};

    this.props.addToBasketFunc(tempObj);
    this.setState({
      itemQty: 1,
    });
  }
  handleAddClick = () => {

    let tempObj = [];
    tempObj.offer ={};

    //Error checks for qty value
    if (this.state.itemQty === "" ||
        this.state.itemQty <= 0) {
      alert("ERROR: You must enter a quantity greater than 0 before pressing the ADD button");
      
      this.setState({
        itemQty: 1,
      });

      return;
    }

    if (this.state.itemQty > 20 ){
      alert("ERROR: You can only have a quantity of upto 20 for any single item");
      
      this.setState({
        itemQty: 1,
      });

      return;
    }
    // Need to update the quantity value and the itemTotal in the object
    tempObj = {item: this.props.item,
                     name: this.props.name,
                     qty: this.state.itemQty,
                     price: this.props.price,
                     itemTotal: Math.round(this.state.itemQty * this.props.price * 100)/100,
                     offer: this.props.offer};
    
    this.props.addToBasketFunc(tempObj);
    
    this.setState({
      itemQty: 1,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-lg-6">
          {this.props.name}
          <p className="offer"> {this.props.offer.desc}</p>
        </div>
        <div className="col-12 col-lg-2">
          {this.props.price.toLocaleString("en",{style: "currency", currency:"GBP"})}
        </div>
        <div className="col-12 col-lg-2">
          <input
            id="addItemQty"
            type="number"
            className="form-control"
            value={this.state.itemQty}
            onChange={this.updateItemQty} />
        </div>

        <div className="col-12 col-lg-2">
           <button type="button" 
                   className="btn btn-success btn-sm"
                   onClick={this.handleAddClick}> +
           </button>
           {this.hideButton() 
                            ?
                            <button type = "button" className="btn btn-danger btn-sm"
                                    onClick={this.handleMinusClick}>-
                            </button>
                            :
                            // <button type = "button" className="btn btn-danger" disabled>
                           <button className="hiddenButton">
                            </button>   
                        }
        </div>
       </div >
    );
  }
}

export default ListItems;