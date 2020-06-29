import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ListItems from './ListItems';


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
const offerTest = {desc: "cheap apples"};

it("renders with missing image, name and price", () => {

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

it("renders with correct offer details", () => {

  act(() => {
    render(<ListItems image="apples.png" name="grapes" price="1.23"  offer= {offerTest} disableButtonFunc={mockdisableButtonFunc}
    />, 
    container);
  });
  expect(container.textContent).toBe("grapes1.23 + cheap apples");

});



