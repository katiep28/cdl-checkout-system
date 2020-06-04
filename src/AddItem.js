import React from "react";

class AddItem extends React.Component {
  state = {
    itemQty: 1,
    newItem: ""
  }
  updateItem = (event) => {
    this.setState({
      newItem: event.target.value
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
    this.props.addTaskFunc(this.state.newItem, this.state.itemQty);
    this.setState({
      itemQty: 1,
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
          <input
            id="dropdown"
            type="text"
            className="text"
            placeholder="This is a drop down"
            value={this.state.newItem}
            onChange={this.updateNewItem} />
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