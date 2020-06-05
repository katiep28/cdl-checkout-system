import React from "react";
import DropDown from './DropDown';

class AddItem extends React.Component {
  state = {
    itemQty: 1,
    name: "",
    price: 0,
    offer: {}
  }
  updateItem = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  updateItemQty = (event) => {
    this.setState({
      itemQty: event.target.value
    })
  }

  handleClick = () => {

    if (this.state.Itemqty === "") {
      alert("ERROR: You must enter a quantity greater than 0 before pressing the ADD button");
    }
    this.props.addToBasketFunc(this.state.name, this.state.price, this.state.itemQty, this.state.offer);
    this.setState({
      itemQty: 1,
    });
  }
  saveItem = (name) => {
    // this.props.itemArray.forEach(item => {
    //   if (item.name === name){
    //     price = item.price;
    //     offer = item.offer;
    //     return ;
    //   }} 
    //  );
     const selectedItem = this.props.itemArray.filter(item => item.name === name);

     this.setState({
      name: name,
      price: selectedItem[0].price,
      offer: selectedItem[0].offer
    });
  };
  render() {
    return (
      // <section className= "add">
      <div className="row paddingabove">
        <div className="col-12 col-lg-1">
          <h3>Item</h3>
        </div>
        <div className="col-12 col-lg-3">
        <DropDown
                  itemArray={this.props.itemArray}
                  saveItemFunc={this.saveItem}
                  label="AlcoholicItems" style={{ width: "160px" }}
                  key="1"
                />
        </div>

        <div className="col-12 col-lg-3">
          <h3 align="right"> How many?</h3>
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
           <button type="button" className="btn btn-success btn-lg"
          onClick={this.handleClick}>Add
           </button>
        </div>
       </div >
      // {/* </section > */}
    );
  }
}

export default AddItem;