import React from "react";

class DeleteItem extends React.Component {

  handleClick = () => {

    this.props.deleteFromBasketFunc(this.props.item);
  }

  hideButton = () => {
    // Do not want to display the delte button on the Savings line
    if (this.props.name === "Savings"){
        return false;
    }
    else {return true;}
}

  render() {
    return (
      <div className="row">
        <div className="col-4 col-lg-1">
        {this.hideButton() 
                            ?
                            <button type = "button" className="btn btn-light btn-sm"
                                    onClick={this.handleClick}>x
                            </button>
                            :
                            <button type="button" className="btn btn-light btn-sm" disabled>
                            </button>
                        }
               </div>
      </div>
    );
  }
}
export default DeleteItem;