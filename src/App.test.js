import React from 'react';
import App from './App';
import { shallow } from 'enzyme';


it('renders without crashing', () => {
  shallow(<App />);
});


it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>CDL Checkout App</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});


it('instruction to add item to basket', () => {
  const wrapper = shallow(<App />);
  const welcome = <p>Select an item to add to your basket</p>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

it('Savings Total exists', () => {
  const wrapper = shallow(<App />);
  const welcome = <h3 className="savingsTotal">Savings</h3>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

it('Total exists', () => {
  const wrapper = shallow(<App />);
  const welcome = <h3>Total</h3>;
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});

it('Checkout Button exists', () => {
  const wrapper = shallow(<App />);
  const welcome = <h3>Total</h3>;
  expect(wrapper.contains(welcome)).toEqual(true);
});




