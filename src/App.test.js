import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
// =================================================
import { unmountComponentAtNode } from "react-dom";



it('renders without crashing', () => {
  shallow(<App />);
});


it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const message = <h1>CDL Checkout App</h1>;
  expect(wrapper.contains(message)).toEqual(true);
});


it('instruction to add item to basket', () => {
  const wrapper = shallow(<App />);
  const message = <p>Select an item to add to your basket</p>;
  expect(wrapper.contains(message)).toEqual(true);
});

it('Savings Total exists', () => {
  const wrapper = shallow(<App />);
  const message = <h3 className="savingsTotal">Savings</h3>;
  expect(wrapper.contains(message)).toEqual(true);
});

it('Total exists', () => {
  const wrapper = shallow(<App />);
  const message = <h3>Total</h3>;
  expect(wrapper.contains(message)).toEqual(true);
});




