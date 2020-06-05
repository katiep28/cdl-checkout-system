import React from "react";

class ListItem extends React.Component {

  handleCompleteTick = () => {
    this.props.updateTaskFunc(this.props.id, "C");
  }
  handleDeleteTick = () => {
    this.props.updateTaskFunc(this.props.id, "D");
  }

  render()
   {  
    return (

     <div className="row padditemrow">
        <div className="col-4 col-lg-4 col-blue">
          <div>
              {this.props.name}   
          </div>
        </div>
        <div className="col-4 col-lg-4 col-blue">
          <div className="qty" align="right">
              {this.props.qty}   
          </div>
        </div>
        <div className="col-4 col-lg-4 col-blue">
          <div className="itemPrice" align="right">
              {this.props.itemTotal}   
          </div>
        </div>
      </div>
    );
  }
}
export default ListItem;