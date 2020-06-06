import React from "react";
import DropDown from './DropDown';

class ListItems extends React.Component {
  state = {
    itemQty: 1,
    itemToAddObj: {
                  name:"",
                  price: 0,
                  qty: 0,
                  itemTotal:0,
                  offer: {}
                  }
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

    // const tempObj = this.state.itemToAddObj;

    // Object.assign(tempObj, tempQty);

    // this.setState({
    //   itemToAddObj:{
    //     qty: tempObj.qty,
    //     itemTotal: tempObj.itemTotal
    //   }
    // });
      
    // this.props.addToBasketFunc(this.state.itemToAddObj);
    this.props.addToBasketFunc(tempObj);
    this.setState({
      itemQty: 1,
    });
  }

  // saveItem = (name) => {

  //    const selectedItem = this.props.itemArray.filter(item => item.name === name);

  //    this.setState({
  //      itemToAddObj: {
  //                     name: name,
  //                     price: selectedItem[0].price,
  //                     qty: 0,
  //                     itemTotal: 0,
  //                     offer: selectedItem[0].offer
  //                   }
  //   });


  render() {
    return (
      <div className="row paddingabove">
        <div className="col-12 col-lg-4">
          {this.props.name}
        </div>
        <div className="col-12 col-lg-2">
          <input
            id="addItemQty"
            type="number"
            className="form-control"
            value={this.state.itemQty}
            onChange={this.updateItemQty} />
        </div>

        <div className="col-12 col-lg-4">
           <button type="button" 
                   className="btn btn-success btn-lg"
                   onClick={this.handleClick}>Add
           </button>
        </div>
       </div >
    );
  }
}

export default ListItems;