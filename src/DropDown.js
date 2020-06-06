import React from 'react';

class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
            selectedItem: ""
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    handleDropdownChange(e) {

        this.setState({ selectedItem: e.target.value });
    
        this.props.saveItemFunc(e.target.value);
    }

    hideDropdownMenu() {
        // set the item and that was clicked on

        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }

    render() {
        return (
            <div>
                <div className="button"
                    onClick={this.showDropdownMenu} >
                </div>
                <select name="Item" id="dropdown" onChange={this.handleDropdownChange}>
                    <option>CHOOSE</option>
                    {this.props.itemArray.map(item => {
                        return <option key={item.name} 
                                value={item.name}> 
                                   {item.name}{"   "+"£"+(item.price)}
                                </option>
                    })} 
                </select>
            </div>
        );
    }
}

export default Dropdown;
