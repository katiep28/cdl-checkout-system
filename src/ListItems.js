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

  handleMinusClick = () => {
    if (this.state.itemQty === "") {
      alert("ERROR: You must enter a quantity greater than 0 before pressing the ADD button");
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

    if (this.state.itemQty === "") {
      alert("ERROR: You must enter a quantity greater than 0 before pressing the ADD button");
    }
    // Need to update the quantity value and the itemTotal in the object
    const tempObj = {item: this.props.item,
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
        <div className="col-12 col-lg-5">
          {this.props.name}
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

        <div className="col-12 col-lg-3">
           <button type="button" 
                   className="btn btn-success"
                   onClick={this.handleAddClick}> +
           </button>
           <button type="button" 
                   className="btn btn-danger"
                   onClick={this.handleMinusClick}> -
           </button>
        </div>
       </div >
    );
  }
}

export default ListItems;