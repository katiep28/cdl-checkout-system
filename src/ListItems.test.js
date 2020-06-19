import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ListItems from './ListItems';




// it('renders without crashing', () => {
//   shallow(<App />);
// });


// it('renders welcome message', () => {
//   const wrapper = shallow(<App />);
//   const welcome = <h1>CDL Checkout App</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });




let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const  mockdisableButtonFunc = jest.fn();

it("Image missing or incorrect file name", () => {

  act(() => {
    render(<ListItems image="" name="Apples" price="1.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("Apples1.23 + ");
  act(() => {
    render(<ListItems image="pples.png" name="grapes" price="0.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("grapes0.23 + ");

});

it("renders with missing name and price", () => {

  act(() => {
    render(<ListItems image="" name="" price=""  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe(" + ");
  act(() => {
    render(<ListItems image="apples.png" name="" price="1.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("1.23 + ");

  act(() => {
    render(<ListItems image="apples.png" name="cucumber" price=""  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("cucumber + ");

});

it("renders with correct name and price details", () => {

  act(() => {
    render(<ListItems image="apples.png" name="grapes" price="1.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("grapes1.23 + ");

  act(() => {
    render(<ListItems image="apples.png" name="cucumber" price="0.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("cucumber0.23 + ");

});

it("renders with offer", () => {

  act(() => {
    render(<ListItems image="apples.png" name="grapes" price="1.23"  offer= "{desc=ggg}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("grapes1.23 + ");

  act(() => {
    render(<ListItems image="apples.png" name="cucumber" price="0.23"  offer= "{}" disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("cucumber0.23 + ");

});

