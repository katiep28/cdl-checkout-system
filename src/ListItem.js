import React from "react";

class ListItem extends React.Component {

  render() {
    return (

      <div className="row padditemrow">
        <div className="col-4 col-lg-4">
          <div>
            {this.props.name}
          </div>
        </div>
        <div className="col-4 col-lg-4">
          <div className="qty" align="right">
            {this.props.qty}
          </div>
        </div>
        <div className="col-4 col-lg-4">
          <div className="itemPrice" align="right">
            {this.props.itemTotal.toLocaleString("en",{style: "currency", currency:"GBP"})}
        
          </div>
        </div>
      </div>
    );
  }
}
export default ListItem;