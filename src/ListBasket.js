import React from "react";

class ListBasket extends React.Component {

  render() {
    return (
      <div className="row padditemrow">
        <div className="col-7 col-lg-7">
          <div>
            {this.props.name}
          </div>
        </div>
        <div className="col-2 col-lg-1">
          <div className="qty" align="right">
            {this.props.qty}
          </div>
        </div>
        <div className="col-3 col-lg-2">
          <div className="itemPrice" align="right">
            {this.props.itemTotal.toLocaleString("en",{style: "currency", currency:"GBP"})}
          </div>
        </div>
      </div>
    );
  }
}
export default ListBasket;