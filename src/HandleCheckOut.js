import React from "react";

class HandleCheckOut extends React.Component {

  handleClick = () => {

    // Process Check out either write to a database or a JSON file
    // This functionality has not been included.
    this.props.checkOutFunc();
  }

  hideButton = () => {
    // Do not want to display the button if there is nothing in the basket
    if (this.props.shoppingBasket.length === 0){
        return false;
    }
    else {return true;}
}

  render() {
    return (
      <div className="row">
        <div className="col-12 col-lg-10 rounded-pill">
        {this.hideButton() 
                            ?
                            <button type = "button" className="btn btn-info btn-block btn-lg"
                                    onClick={this.handleClick}>CHECK OUT
                            </button>
                            :
                            <button type="button" className="btn btn-light btn-sm" disabled>
                            </button>
                        }
               </div>

        <div className="col-4 col-lg-2"/>
      </div>
    );
  }
}
export default HandleCheckOut;