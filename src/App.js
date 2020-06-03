import React from 'react';
// import logo from './logo.svg';
import './App.css';
import pricingData from './data/pricingData.json';

class App extends React.Component {
  state = {}
  
  render(){

    const items = pricingData.item;
  return (
    // <div className="App">
      <header>
        <h1> CDL Checkout App</h1>
        {console.log(items)}
      </header>
    // </div>
  );
  }
}

export default App;
